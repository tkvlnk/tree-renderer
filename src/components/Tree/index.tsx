import React, { useCallback, useState } from 'react';

interface TreeData {
  title: string;
  children?: TreeData[];
}

export interface TreeProps {
  data: TreeData;
}

const Tree: React.FC<TreeProps> = props => {
  const { data } = props;

  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = Boolean(data.children?.length);
  const showChildren = hasChildren && isOpen;

  const toggleChildren = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div>
      <div>
        <span>{data.title}</span>

        {hasChildren && (
          <button type="button" onClick={toggleChildren}>
            {isOpen ? 'hide' : 'show'}
          </button>
        )}
      </div>

      {showChildren && (
        <ul>
          {data.children?.map(childData => (
            <li key={childData.title}>
              <Tree data={childData} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tree;
