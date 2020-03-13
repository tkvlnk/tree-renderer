import React, { useCallback, useState } from 'react';
import { useTree } from '../Tree';
import { TreeData } from '../Tree/TreeController';
import sm from './styles.module.scss';

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
    <ol>
      <li>
        <div className={sm.Leaf}>
          <div>
            {hasChildren && (
              <>
                <button type="button" onClick={toggleChildren}>
                  {isOpen ? '-' : '+'}
                </button>
              </>
            )}

            <span>{data.title}</span>
          </div>

          <button
            type="button"
            onClick={() => renameChild(rootPath, data.title)}
          >
            Rename
          </button>
          {Boolean(rootPath) && (
            <button
              type="button"
              onClick={() => removeChild(rootPath, data.title)}
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              addChild([rootPath, data.title].filter(Boolean).join('.'))
            }
          >
            Add Child
          </button>
        </div>

        {showChildren && (
          <ol>
            {data.children?.map(childData => (
              <li key={childData.title}>
                <TreeBranch
                  data={childData}
                  rootPath={[rootPath, data.title].filter(Boolean).join('.')}
                />
              </li>
            ))}
          </ol>
        )}
      </li>
    </ol>
  );
};

export default TreeBranch;
