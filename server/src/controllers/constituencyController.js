const ConstituencyInfo = require('../models/ConstituencyInfo');

// GET /api/v1/constituency (Public)
const getConstituency = async (req, res, next) => {
  try {
    let info = await ConstituencyInfo.findOne();
    if (!info) {
      info = await ConstituencyInfo.create({
        mandals: [
          { name: 'Bhupalpalle', description: 'District Headquarter, Singareni Collieries area' },
          { name: 'Ghanpur (Mulug)', description: 'Agrarian heartland & Ghanapur reservoir command ayacut' },
          { name: 'Regonda', description: 'Agricultural mandal & Kotanchu temple site' },
          { name: 'Shayampet', description: 'Rural agricultural economy and primary education hub' },
          { name: 'Chityal', description: 'Transit hub, modern bus terminus, agricultural markets' },
          { name: 'Mogullapalle', description: 'Farming communities and tank irrigation ayacut' }
        ]
      });
    }
    return res.status(200).json({
      success: true,
      data: info
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/constituency (Admin)
const updateConstituency = async (req, res, next) => {
  try {
    let info = await ConstituencyInfo.findOne();
    if (!info) {
      info = new ConstituencyInfo(req.body);
    } else {
      Object.assign(info, req.body);
    }
    await info.save();
    return res.status(200).json({
      success: true,
      message: 'Constituency information updated successfully',
      data: info
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConstituency,
  updateConstituency
};
