import pipelinesImg from '../assets/images/project_automated_pipelines_1790444059910.jpg';
import fintechImg from '../assets/images/project_automotive_fintech_1790444072712.jpg';
import enviroImg from '../assets/images/project_environmental_intelligence_1790444085656.jpg';
import gamesImg from '../assets/images/project_video_games_1790444096168.jpg';
import ethernetImg from '../assets/images/project_ethernet_1790443119403.jpg';
import nebuladbImg from '../assets/images/project_nebuladb_1790443110126.jpg';
import synthflowImg from '../assets/images/project_synthflow_1790443098734.jpg';
import heroWorkspaceImg from '../assets/images/portfolio_hero_workspace_1790443087755.jpg';

const assetMap: Record<string, string> = {
  'project_automated_pipelines_1790444059910.jpg': pipelinesImg,
  'project_automotive_fintech_1790444072712.jpg': fintechImg,
  'project_environmental_intelligence_1790444085656.jpg': enviroImg,
  'project_video_games_1790444096168.jpg': gamesImg,
  'project_ethernet_1790443119403.jpg': ethernetImg,
  'project_nebuladb_1790443110126.jpg': nebuladbImg,
  'project_synthflow_1790443098734.jpg': synthflowImg,
  'portfolio_hero_workspace_1790443087755.jpg': heroWorkspaceImg,
};

export function resolveAssetUrl(url?: string): string {
  if (!url) return '';
  // If it's an external URL, base64 data, or blob, return as is
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  
  // Extract filename if it was a path like /src/assets/images/foo.jpg or /assets/images/foo.jpg
  const filename = url.split('/').pop()?.split('?')[0];
  if (filename && assetMap[filename]) {
    return assetMap[filename];
  }
  
  if (assetMap[url]) {
    return assetMap[url];
  }
  
  return url;
}
