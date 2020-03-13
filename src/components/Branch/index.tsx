import React, { useCallback, useState } from 'react';
import { useTree } from '../Tree';
import { TreeData } from '../Tree/TreeController';

export interface TreeBranchProps {
  data: TreeData;
  rootPath: string;
}

const TreeBranch: React.FC<TreeBranchProps> = props => {
  const { data, rootPath } = props;

  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = Boolean(data.children?.length);
  const showChildren = hasChildren && isOpen;

  const toggleChildren = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const { addChild, renameChild, removeChild } = useTree();

  return (
    <div>
      <div>
        <span>{data.title}</span>

        <button type="button" onClick={() => renameChild(rootPath, data.title)}>
          Rename
        </button>
        <button type="button" onClick={() => removeChild(rootPath, data.title)}>
          Remove
        </button>
        <button
          type="button"
          onClick={() =>
            addChild([rootPath, data.title].filter(Boolean).join('.'))
          }
        >
          Add Child
        </button>

        {hasChildren && (
          <>
            <button type="button" onClick={toggleChildren}>
              {isOpen ? 'hide' : 'show'}
            </button>
          </>
        )}
      </div>

      {showChildren && (
        <ul>
          {data.children?.map(childData => (
            <li key={childData.title}>
              <TreeBranch
                data={childData}
                rootPath={[rootPath, data.title].filter(Boolean).join('.')}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeBranch;
