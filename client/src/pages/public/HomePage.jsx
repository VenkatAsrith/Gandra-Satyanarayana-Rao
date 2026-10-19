import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from '../../components/public/HeroSection';
import StoryGrid from '../../components/public/StoryGrid';
import JourneyTimeline from '../../components/public/JourneyTimeline';
import ConstituencyOverview from '../../components/public/ConstituencyOverview';
import WorkSpreads from '../../components/public/WorkSpreads';
import FeaturedAdvocacy from '../../components/public/FeaturedAdvocacy';
import RecentActivities from '../../components/public/RecentActivities';
import GalleryGrid from '../../components/public/GalleryGrid';
import ContactChannels from '../../components/public/ContactChannels';
import { api } from '../../services/api';

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [constituency, setConstituency] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, profRes, projRes, actRes, galRes, constRes] = await Promise.all([
          api.getSettings(),
          api.getProfile(),
          api.getProjects('limit=10'),
          api.getActivities('limit=10'),
          api.getGallery('limit=6'),
          api.getConstituency()
        ]);

        if (settRes?.data) setSettings(settRes.data);
        if (profRes?.data) setProfile(profRes.data);
        if (projRes?.data) setProjects(projRes.data);
        if (actRes?.data) setActivities(actRes.data);
        if (galRes?.data) setGallery(galRes.data);
        if (constRes?.data) setConstituency(constRes.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        <HeroSection profile={profile} settings={settings} />
        <StoryGrid profile={profile} />
        <JourneyTimeline timeline={profile?.timeline} />
        <ConstituencyOverview constituency={constituency} />
        <WorkSpreads projects={projects} />
        <FeaturedAdvocacy activity={activities?.find((a) => a.isHighlighted)} />
        <RecentActivities activities={activities} />
        <GalleryGrid mediaItems={gallery} showFilter={false} isTeaser={true} />
        <ContactChannels settings={settings} showForm={true} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
