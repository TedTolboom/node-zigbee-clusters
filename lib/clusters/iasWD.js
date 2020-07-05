'use strict';

const Cluster = require('../Cluster');

const ATTRIBUTES = {
  maxDuration: { id: 0, type: ZCLDataTypes.uint16 },
};

const COMMANDS = {
  startWarning: {
    id: 0,
    args: {
      warningModeStrobeAndSirenLevel : ZCLDataTypes.map8({
        warningMode: ZCLDataTypes.enum4({
          stop: 0,            // 0 Stop (no warning)
          burglar: 1,         // 1 Burglar
          fire: 2,            // 2 Fire
          emergency:3,        // 3 Emergency
          police: 4,          // 4 Police panic
          firePanic: 5,       // 5 Fire panic
          emergencyPanic: 6,  // 6 Emergency Panic (i.e., medical issue)
        }),
        strobe: ZCLDataTypes.enum2({
          noStrobe: 0,                      // 0 No strobe
          useStrobeInParallelToWarning: 1,  // 1 Use strobe in parallel to warning
        }),
        sirenLevel: ZCLDataTypes.enum2({
          lowLevelSound: 0,       // 0 Low level sound
          mediumLevelSound: 1,    // 1 Medium level sound
          highLevelSound: 2,      // 2 High level sound
          veryHighLevelSound: 3,  // 3 Very high level sound
        }),
      }),
      warningDuration: ZCLDataTypes.uint16,
      strobeDutyCycle: ZCLDataTypes.uint8,
      strobeLevel: ZCLDataTypes.enum8({
        lowLevelStrobe: 0,      // 0x00 Low level strobe
        mediumLevelStrobe: 1,   // 0x01 Medium level strobe
        highLevelStrobe: 2,     // 0x02 High level strobe
        veryHighLevelStrobe: 3, // 0x03 Very high level strobe
      });
    },
  },
  squawk: {
    id: 1,
    args: {
      squawkModeStrobeAndLevel: ZCLDataTypes.map8({
        /*
        0-3 Squawk Mode - indicates the meaning of the required ‘squawk’:
            0 - System is armed
            1 - System is disarmed
            All other values are reserved
        4 Strobe - indicates whether a visual strobe indication of the ‘squawk’ is required:
            0 - No strobe
            1 - Use strobe
        5 Reserved
        6-7 Squawk Level - indicates the requested level of the audible squawk sound:
            0 - Low level
            1 - Medium level
            2 - High level
            3 - Very high level
        */
      })
    }
  }
};

class IASWDCluster extends Cluster {

  static get ID() {
    return 1282;
  }

  static get NAME() {
    return 'iasWD';
  }

  static get ATTRIBUTES() {
    return ATTRIBUTES;
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(IASWDCluster);

module.exports = IASWDCluster;
