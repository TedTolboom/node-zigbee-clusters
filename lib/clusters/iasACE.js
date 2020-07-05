'use strict';

const Cluster = require('../Cluster');

const ATTRIBUTES = {
};

const COMMANDS = {
  arm: {
    id: 0,
    args: {
      armMode: ZCLDataTypes.enum8({
        disarm: 0,                  // 0x00 Disarm
        armDayHomeZonesOnly: 1,     // 0x01 Arm Day/Home Zones Only
        armNightSleepZonesOnly: 2,  // 0x02 Arm Night/Sleep Zones Only
        armAllZones: 3,             // 0x03 Arm All Zones
      }),
      armDisarmCode: ZCLDataTypes.string,
      zoneID: ZCLDataTypes.uint8
    }
  },
  bypass: {
    id: 3,
    args: {
      Number of Zones: ZCLDataTypes.uint8,
      Zone ID: ZCLDataTypes.uint8,
      // TODO: how to add multiple zoneID's
      armDisarmCode: ZCLDataTypes.string,
    }
  },
  emergency: {
    id: 2,
    args: {}
  },
  fire: {
    id: 3,
    args: {}
  },
  panic: {
    id: 4,
    args: {}
  },
  getZoneIDMap: {
    id: 5,
    args: {}
  },
  getZoneInformation : {
    id: 6,
    args: {
      zoneID: ZCLDataTypes.uint8,
    }
  },
  getPanelStatus: {
    id: 7,
    args: {}
  },
  getBypassedZoneList: {
    id: 8,
    args: {}
  },
  getZoneStatus : {
    id: 9,
    args: {
      startingZoneID: ZCLDataTypes.uint8,
      maxNumberOfZoneIDs: ZCLDataTypes.uint8,
      zoneStatusMask: ZCLDataTypes.bool,
      flagZoneStatusMask: ZCLDataTypes.map16({
        // TODO: 8.3.2.4.8.5 Zone Status Mask Field
      }),
    }
  },
};

class IASACECluster extends Cluster {

  static get ID() {
    return 1281;
  }

  static get NAME() {
    return 'iasACE';
  }

  static get ATTRIBUTES() {
    return ATTRIBUTES;
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(IASACECluster);

module.exports = IASACECluster;
