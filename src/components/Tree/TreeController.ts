// import get from 'lodash.get';
// import set from 'lodash.set';
import clone from 'lodash.clonedeep';

export interface TreeData {
  title: string;
  children?: TreeData[];
}

export default class TreeController {
  constructor(public data: TreeData) {}

  static getChildByPath = (data: TreeData, path: string): TreeData => {
    if (!path) {
      return data;
    }

    const pathTail = path.split('.');

    pathTail.shift();

    const child = pathTail.reduce<TreeData | null>((result, childName) => {
      return result?.children?.find(({ title }) => childName === title) ?? null;
    }, data);

    if (child) {
      return child;
    }

    throw new Error('Invalid path');
  };

  addChild = (path: string, title: string): void => {
    const newData = clone(this.data);

    const branch = TreeController.getChildByPath(newData, path);

    if (!branch.children) {
      branch.children = [];
    }

    branch.children.push({
      title,
      children: []
    });

    this.data = newData;
  };

  removeChild = (path: string, titleToRemove: string): void => {
    const newData = clone(this.data);

    const branch = TreeController.getChildByPath(newData, path);
    if (!branch.children) {
      throw new Error('No children found');
    }
    branch.children = branch.children.filter(
      ({ title }: TreeData) => title !== titleToRemove
    );

    this.data = newData;
  };

  renameChild = (path: string, oldTitle: string, newTitle: string): void => {
    const newData = clone(this.data);

    if (!path && oldTitle === newData.title) {
      newData.title = newTitle;
    }

    const branch = TreeController.getChildByPath(newData, path);

    if (!branch.children) {
      throw new Error('No children found');
    }

    branch.children = branch.children.map(({ title, ...rest }: TreeData) => ({
      ...rest,
      title: oldTitle === title ? newTitle : title
    }));

    this.data = newData;
  };
}
