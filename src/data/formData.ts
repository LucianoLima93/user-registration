interface UserData {
  id: number,
  name: string,
}

interface PermisionList {
  code: number,
  description: string,
  editable: boolean,
}

const userData:UserData[] = [
  {
    id: 1,
    name: 'João'
  },
  {
    id: 2,
    name: 'Maria'
  },
  {
    id: 3,
    name: 'José'
  }
]

const permisionList:PermisionList[] = [
  {
    code: 0,
    description: 'Acesso ao sistema',
    editable: false,
  },
  {
    code: 1,
    description: 'Administrativa',
    editable: false,
  },
  {
    code: 2,
    description: 'Contábil',
    editable: false,
  }
]

const DEFAULTPERMISIONCODE = 0;
const CURRENTUSER = 3;

export { userData, permisionList, CURRENTUSER, DEFAULTPERMISIONCODE };
export type { UserData, PermisionList };

