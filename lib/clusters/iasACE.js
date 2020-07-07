'use strict';

const Cluster = require('../Cluster');
const { ZCLDataTypes } = require('../zclTypes');

const ATTRIBUTES = {
};

const COMMANDS = {
  arm: {
    id: 0,
    args: {
      armMode: ZCLDataTypes.enum8({
        disarm: 0, // 0x00 Disarm
        armDayHomeZonesOnly: 1, // 0x01 Arm Day/Home Zones Only
        armNightSleepZonesOnly: 2, // 0x02 Arm Night/Sleep Zones Only
        armAllZones: 3, // 0x03 Arm All Zones
      }),
      armDisarmCode: ZCLDataTypes.string,
      zoneID: ZCLDataTypes.uint8,
    },
  },
  bypass: {
    id: 3,
    args: {
      numberOfZones: ZCLDataTypes.uint8,
      zoneID: ZCLDataTypes.Array0(ZCLDataTypes.uint8),
      armDisarmCode: ZCLDataTypes.string,
    },
  },
  emergency: {
    id: 2,
    args: {},
  },
  fire: {
    id: 3,
    args: {},
  },
  panic: {
    id: 4,
    args: {},
  },
  getZoneIDMap: {
    id: 5,
    args: {},
  },
  getZoneInformation: {
    id: 6,
    args: {
      zoneID: ZCLDataTypes.uint8,
    },
  },
  getPanelStatus: {
    id: 7,
    args: {},
  },
  getBypassedZoneList: {
    id: 8,
    args: {},
  },
  getZoneStatus: {
    id: 9,
    args: {
      startingZoneID: ZCLDataTypes.uint8,
      maxNumberOfZoneIDs: ZCLDataTypes.uint8,
      zoneStatusMaskFlag: ZCLDataTypes.bool,
      zoneStatusMask: {
        id: 2,
        type: ZCLDataTypes.map16(
          'alarm1', // 1 – opened or alarmed, 0 – closed or not alarmed
          'alarm2', // 1 – opened or alarmed, 0 – closed or not alarmed
          'tamper', // 1 – Tampered, 0 – Not tampered
          'battery', // 1 – Low battery, 0 – Battery OK
          'supervisionReports', // 1 – Reports, 0 – Does not report
          'restoreReports', // 1 – Reports restore, 0 – Does not report restore
          'trouble', // 1 – Trouble/Failure, 0 – OK
          'acMains', // 1 – AC/Mains fault, 0 – AC/Mains OK
          'test', // 1 – Sensor is in test mode, 0 – Sensor is in operation mode
          'batteryDefect', // 1 – Sensor detects a defective battery, 0 – Sensor battery is functioning normally
        ),
      },
    },
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
