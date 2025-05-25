import { sessions } from '../sessions';

export const logout = async (hash) => sessions.remove(hash);
