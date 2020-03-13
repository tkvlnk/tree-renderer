import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import TreeBranch from '../Branch';
import TreeController, { TreeData } from './TreeController';

interface TreeContextData {
  addChild: (path: string) => void;
  removeChild: (path: string, title: string) => void;
  renameChild: (path: string, oldTitle: string) => void;
}

const TreeContext = React.createContext<TreeContextData>({
  addChild: () => null,
  removeChild: () => null,
  renameChild: () => null
});

export interface TreeProps {
  data: TreeData;
  onDataChange?: (data: TreeData) => void;
}

export const useTree = () => useContext(TreeContext);

const Tree: React.FC<TreeProps> = props => {
  const { data, onDataChange = () => null } = props;

  const ref = useRef(new TreeController(data));

  const [treeData, setTreeData] = useState(ref.current.data);

  useEffect(() => {
    setTreeData(ref.current.data);
  }, [data]);

  useEffect(() => {
    onDataChange(treeData);
  }, [treeData]);

  const handleDataUpdate = useCallback(() => {
    setTreeData(ref.current.data);
  }, []);

  const handlers: Omit<TreeContextData, 'data'> = useMemo(
    () => ({
      addChild: path => {
        const newTitle = prompt('Enter child name');

        if (!newTitle) {
          alert('Title is required');
        } else {
          ref.current.addChild(path, newTitle);
          handleDataUpdate();
        }
      },
      removeChild: (path, title) => {
        ref.current.removeChild(path, title);

        handleDataUpdate();
      },
      renameChild: (path, oldTitle) => {
        const newTitle = prompt('Enter child name');

        if (!newTitle) {
          alert('Title is required');
        } else {
          ref.current.renameChild(path, oldTitle, newTitle);
          handleDataUpdate();
        }
      }
    }),
    []
  );

  return (
    <TreeContext.Provider value={handlers}>
      <TreeBranch data={treeData} rootPath="" />
    </TreeContext.Provider>
  );
};

export default Tree;
