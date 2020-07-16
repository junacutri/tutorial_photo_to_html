import * as adsTypes from './generated/ads';
export interface ChannelCredsConfig {
    type: string;
    config?: object;
}
export interface XdsServerConfig {
    serverUri: string;
    channelCreds: ChannelCredsConfig[];
}
export interface BootstrapInfo {
    xdsServers: XdsServerConfig[];
    node: adsTypes.messages.envoy.api.v2.core.Node;
}
export declare function loadBootstrapInfo(): Promise<BootstrapInfo>;
