import { create } from 'zustand';


interface PlaylistState {
  currentPlaying: Stream | null;
  playlist: Stream[];
  addSong: (newSong: Stream | Stream[]) => void;
  playNext: () => void;
}

const usePlaylistStore = create<PlaylistState>((set) => ({
  currentPlaying: null,
  playlist: [],

  addSong: (newSong) =>
    set((state) => {
      const newSongs = Array.isArray(newSong) ? newSong : [newSong];
      if (!state.currentPlaying && newSongs.length > 0) {
        const [firstSong, ...restSongs] = newSongs;
        return {
          currentPlaying: firstSong,
          playlist: [...state.playlist, ...restSongs]
        };
      } else {
        return {
          playlist: [ ...newSongs]
        };
      }
    }),

  playNext: () =>
    set((state) => {
      if (state.playlist.length > 0) {
        const [nextSong, ...remainingPlaylist] = state.playlist;
        return {
          currentPlaying: nextSong,
          playlist: remainingPlaylist
        };
      }
      return state; 
    }),
}));

export default usePlaylistStore;

