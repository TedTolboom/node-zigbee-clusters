'use strict';

const Cluster = require('../Cluster');

const ATTRIBUTES = {
  zoneState: { id: 0, type: ZCLDataTypes.enum8({
    notEnrolled:  0,
    enrolled:     1,
  }) },
  zoneType: { id: 1, type: ZCLDataTypes.enum16({
                                  // Value  Zone Type                    Alarm1                      Alarm2
    standardCIE: 0,               // 0x0000 Standard CIE                 System Alarm                -
    motionSensor: 13,             // 0x000d Motion sensor                Intrusion indication        Presence indication
    contactSwitch: 21,            // 0x0015 Contact switch               1st portal Open-Close       2nd portal Open-Close
    fireSensor: 40,               // 0x0028 Fire sensor                  Fire indication             -
    waterSensor: 42,              // 0x002a Water sensor                 Water overflow indication   -
    carbonMonoxideSensor: 43,     // 0x002b Carbon Monoxide (CO) sensor  CO indication               Cooking indication
    personalEmergencyDevice: 44,  // 0x002c Personal emergency device    Fall/Concussion             Emergency button
    vibrationMotionSensor: 45,    // 0x002d Vibration/Movement sensor    Movement indication         Vibration
    remoteControl: 271,           // 0x010f Remote Control               Panic                       Emergency
    keyFob: 277,                  // 0x0115 Key fob                      Panic                       Emergency
    keyPad: 541,                  // 0x021d Keypad                       Panic                       Emergency
    standardWarningDEvice: 549,   // 0x0225 Standard Warning Device      -                           -
    glassBreakSensor: 550,        // 0x0226 Glass break sensor           Glass breakage detected     -
    securityRepeater: 553,        // 0x0229 Security repeater*           -                           -
                                  // 0x8000-0xfffe manufacturer specific types - -
    invalidZoneType: 65535,       // 0xffff Invalid Zone Type            -                           -
  }) },
  zoneStatus: { id: 2, type: ZCLDataTypes.map16(
    'alarm1',             // 1 – opened or alarmed, 0 – closed or not alarmed
    'alarm2',             // 1 – opened or alarmed, 0 – closed or not alarmed
    'tamper',             // 1 – Tampered, 0 – Not tampered
    'battery',            // 1 – Low battery, 0 – Battery OK
    'supervisionReports', // 1 – Reports, 0 – Does not report
    'restoreReports',     // 1 – Reports restore, 0 – Does not report restore
    'trouble',            // 1 – Trouble/Failure, 0 – OK
    'acMains',            // 1 – AC/Mains fault, 0 – AC/Mains OK
    'test',               // 1 – Sensor is in test mode, 0 – Sensor is in operation mode
    'batteryDefect'       // 1 – Sensor detects a defective battery, 0 – Sensor battery is functioning normally
  ) },
  iasCIEAddress : { id: 16, type: ZCLDataTypes.EUI64 },
  zoneID: { id: 17, type: ZCLDataTypes.uint8 },
  numberOfZoneSensitivityLevelsSupported: { id: 18, type: ZCLDataTypes.uint8 },
  currentZoneSensitivityLevel: { id: 19, type: ZCLDataTypes.uint8 },
};

const COMMANDS = {
  zoneEnrollResponse: {
    id: 0,
    args: {
      enrollResponseCode : ZCLDataTypes.enum16({
        success: 0,         // 0x00 Success Success
        notSupported: 1,    // 0x01 Not supported This specific Zone type is not known to the CIE and is not supported.
        noEnrollPermit: 2,  // 0x02 No enroll permit CIE does not permit new zones to enroll at this time.
        tooManyZones: 3,    // 0x03 Too many zones CIE reached its limit of number of enrolled zones
      }),
      zoneID: ZCLDataTypes.uint16,
    },
  },
  initiateNormalOperationMode: {
    id: 1,
    args: {
      enrollResponseCode : ZCLDataTypes.uint8,
      zoneID: ZCLDataTypes.uint16,
    },
  },
  initiateTestMode: {
    id: 2,
    args: {
      testModeDuration : ZCLDataTypes.uint8,
      currentZoneSensitivityLevel: ZCLDataTypes.uint16,
    },
  },
};

class IASZoneCluster extends Cluster {

  static get ID() {
    return 1280;
  }

  static get NAME() {
    return 'iasZone';
  }

  static get ATTRIBUTES() {
    return ATTRIBUTES;
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(IASZoneCluster);

module.exports = IASZoneCluster;
