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
import DynamicSectionRenderer from '../../components/public/DynamicSectionRenderer';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { api } from '../../services/api';

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [constituency, setConstituency] = useState(null);
  const [dynamicSections, setDynamicSections] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const [settRes, profRes, projRes, actRes, galRes, constRes, secRes] = await Promise.all([
          api.getSettings(),
          api.getProfile(),
          api.getProjects('limit=10'),
          api.getActivities('limit=10'),
          api.getGallery('limit=6'),
          api.getConstituency(),
          api.getSections('home').catch(() => ({ data: [] }))
        ]);

        if (settRes?.data) setSettings(settRes.data);
        if (profRes?.data) setProfile(profRes.data);
        if (projRes?.data) setProjects(projRes.data);
        if (actRes?.data) setActivities(actRes.data);
        if (galRes?.data) setGallery(galRes.data);
        if (constRes?.data) setConstituency(constRes.data);
        if (secRes?.data) setDynamicSections(secRes.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };

    loadData();
  }, []);

  // Split dynamic sections into early and late placements if desired
  const earlySections = dynamicSections.filter((s) => (s.order || 0) <= 2);
  const laterSections = dynamicSections.filter((s) => (s.order || 0) > 2);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        <ErrorBoundary>
          <HeroSection profile={profile} settings={settings} />
        </ErrorBoundary>

        <ErrorBoundary>
          <StoryGrid profile={profile} />
        </ErrorBoundary>

        {/* Dynamic Sections (Priority Order 1 & 2) */}
        {earlySections.map((sec) => (
          <ErrorBoundary key={sec._id || sec.key}>
            <DynamicSectionRenderer section={sec} />
          </ErrorBoundary>
        ))}

        <ErrorBoundary>
          <JourneyTimeline timeline={profile?.timeline} />
        </ErrorBoundary>

        <ErrorBoundary>
          <ConstituencyOverview constituency={constituency} />
        </ErrorBoundary>

        <ErrorBoundary>
          <WorkSpreads projects={projects} />
        </ErrorBoundary>

        {/* Dynamic Sections (Order > 2) */}
        {laterSections.map((sec) => (
          <ErrorBoundary key={sec._id || sec.key}>
            <DynamicSectionRenderer section={sec} />
          </ErrorBoundary>
        ))}

        <ErrorBoundary>
          <FeaturedAdvocacy activity={activities?.find((a) => a.isHighlighted)} />
        </ErrorBoundary>

        <ErrorBoundary>
          <RecentActivities activities={activities} />
        </ErrorBoundary>

        <ErrorBoundary>
          <GalleryGrid mediaItems={gallery} showFilter={false} isTeaser={true} />
        </ErrorBoundary>

        <ErrorBoundary>
          <ContactChannels settings={settings} showForm={true} />
        </ErrorBoundary>
      </main>
      <Footer settings={settings} />
    </>
  );
}
