import {atomWithStorage, createJSONStorage} from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage);
const userAtom = atomWithStorage(
  'user',
  {
    id: '',
    access_token: '',
  },
  storage,
);

export default userAtom;
