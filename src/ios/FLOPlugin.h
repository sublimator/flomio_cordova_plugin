/*
FLOPlugin.h
Uses Flomio SDK version 1.9
*/

#import <Cordova/CDV.h>
#import "ReaderManager.h"

@interface FLOPlugin : CDVPlugin <ReaderManagerDelegate>
{
    // Flo-reader attributes
    ReaderManager *sharedManager;
    NSArray* connectedPeripherals;
    
    // Cordova attributes
    NSString* activeReaderType;
    NSMutableDictionary* readerTable;
    NSString* didFindATagUUID_callbackId;
    NSString* readerStatusChange_callbackId;
}

// Cordova functions
- (void)init:(CDVInvokedUrlCommand*)command;
- (void)setReaderSettings:(CDVInvokedUrlCommand*)command;
- (void)selectReaderType:(CDVInvokedUrlCommand*)command;
- (void)startReader:(CDVInvokedUrlCommand*)command;
- (void)stopReader:(CDVInvokedUrlCommand*)command;
- (void)setReaderStatusChangeCallback:(CDVInvokedUrlCommand*)command;
- (void)sendApdu:(CDVInvokedUrlCommand*)command;

// Internal functions (these perform input validation)
- (void)setScanPeriod:(NSString*)periodString :(NSString*)callbackId;
- (void)toggleScanSound:(NSString*)toggleString :(NSString*)callbackId;
- (void)setOperationState:(NSString*)state :(NSString*)callbackId;
- (void)setStartBlock:(NSString*)blockString :(NSString*)callbackId;
- (void)setMessageToWrite:(NSString*)message :(NSString*)callbackId;

// Internal Flo-reader functions
- (void)ReaderManager:(Reader *)reader readerAlert:(UIImageView *)imageView;
- (void)didUpdateConnectedPeripherals:(NSArray *)peripherals;
- (void)didFindATagUUID:(NSString *)UUID fromDevice:(NSString *)deviceId;
- (void)didFindDataBlocks:(NSData *)data fromDevice:(NSString *)deviceId;
- (void)ReaderManager:(Reader *)reader didSendBatteryLevel:(int)level;
- (void)ReaderManager:(Reader *)reader isConnected:(BOOL)connected;

@property (nonatomic, strong) ReaderManager *readerManager;

@end
