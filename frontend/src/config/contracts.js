const DEFAULT_DEPLOYER_ADDRESS = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

export const DEPLOYER_ADDRESS = (
  import.meta.env.VITE_DEPLOYER_ADDRESS || DEFAULT_DEPLOYER_ADDRESS
).trim();

export const CONTRACT_NAMES = {
  clicker: 'clicker-v2p',
  tipjar: 'tipjar-v2p',
  quickpoll: 'quickpoll-v2p',
};
