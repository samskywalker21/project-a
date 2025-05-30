import {atomWithReset} from 'jotai/utils';

const userAtom = atomWithReset({
  name: '',
  position: '',
  section: '',
});

export default userAtom;
