'use strict';

const Cluster = require('../Cluster');
const { ZCLDataTypes } = require('../zclTypes');

const ATTRIBUTES = {
  maxDuration: { id: 0, type: ZCLDataTypes.uint16 },
};

const COMMANDS = {
  startWarning: {
    id: 0,
    args: {
      warningModeStrobeAndSirenLevel: ZCLDataTypes.map8({
        warningMode: ZCLDataTypes.enum4({
          stop: 0, // 0 Stop (no warning)
          burglar: 1, // 1 Burglar
          fire: 2, // 2 Fire
          emergency: 3, // 3 Emergency
          police: 4, // 4 Police panic
          firePanic: 5, // 5 Fire panic
          emergencyPanic: 6, // 6 Emergency Panic (i.e., medical issue)
        }),
        strobe: ZCLDataTypes.enum2({
          noStrobe: 0, // 0 No strobe
          useStrobeInParallelToWarning: 1, // 1 Use strobe in parallel to warning
        }),
        sirenLevel: ZCLDataTypes.enum2({
          lowLevelSound: 0, // 0 Low level sound
          mediumLevelSound: 1, // 1 Medium level sound
          highLevelSound: 2, // 2 High level sound
          veryHighLevelSound: 3, // 3 Very high level sound
        }),
      }),
      warningDuration: ZCLDataTypes.uint16,
      strobeDutyCycle: ZCLDataTypes.uint8,
      strobeLevel: ZCLDataTypes.enum8({
        lowLevelStrobe: 0, // 0x00 Low level strobe
        mediumLevelStrobe: 1, // 0x01 Medium level strobe
        highLevelStrobe: 2, // 0x02 High level strobe
        veryHighLevelStrobe: 3, // 0x03 Very high level strobe
      }),
    },
  },
  squawk: {
    id: 1,
    args: {
      squawkModeStrobeAndLevel: ZCLDataTypes.map8({
        squawkMode: ZCLDataTypes.enum4({
          armed: 0, // 0 Notification sound for “System is armed”
          disarmed: 1, // 1 Notification sound for "System is disarmed"
        }),
        strobe: ZCLDataTypes.enum2({
          noStrobe: 0, // 0 No strobe
          useStrobeInParallelToWarning: 1, // 1 Use strobe in parallel to warning
        }),
        squawkLevelField: ZCLDataTypes.enum4({
          lowLevelSound: 0, // 0 Low level sound
          mediumLevelSound: 1, // 1 Medium level sound
          highLevelSound: 2, // 2 High level sound
          veryHighLevelSound: 3, // 3 Very High level sound
        }),
      }),
    },
  },
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
