// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_API;
export const FILE_BASE_PATH = import.meta.env.VITE_DOWNLOAD_FILE;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.candidate; // as '/dashboard/candidate'
