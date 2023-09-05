class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);

    function constructBalancedTree(start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArr[mid]);

      node.left = constructBalancedTree(start, mid - 1);
      node.right = constructBalancedTree(mid + 1, end);

      return node;
    }

    return constructBalancedTree(0, sortedArr.length - 1);
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(root, value) {
    if (!root) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.insertNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertNode(root.right, value);
    }

    return root;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (!root) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      root.data = this.minValueNode(root.right).data;
      root.right = this.deleteNode(root.right, root.data);
    }

    return root;
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(root, value) {
    if (!root) return null;

    if (value === root.data) {
      return root;
    } else if (value < root.data) {
      return this.findNode(root.left, value);
    } else {
      return this.findNode(root.right, value);
    }
  }

  levelOrder(callback) {
    const result = [];
    if (!this.root) return result;

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      if (callback) callback(node);
    }

    return result;
  }

  inorder(callback) {
    const result = [];
    this.inorderTraversal(this.root, callback, result);
    return result;
  }

  inorderTraversal(node, callback, result) {
    if (!node) return;

    this.inorderTraversal(node.left, callback, result);
    result.push(node.data);
    if (callback) callback(node);
    this.inorderTraversal(node.right, callback, result);
  }

  preorder(callback) {
    const result = [];
    this.preorderTraversal(this.root, callback, result);
    return result;
  }

  preorderTraversal(node, callback, result) {
    if (!node) return;

    result.push(node.data);
    if (callback) callback(node);
    this.preorderTraversal(node.left, callback, result);
    this.preorderTraversal(node.right, callback, result);
  }

  postorder(callback) {
    const result = [];
    this.postorderTraversal(this.root, callback, result);
    return result;
  }

  postorderTraversal(node, callback, result) {
    if (!node) return;

    this.postorderTraversal(node.left, callback, result);
    this.postorderTraversal(node.right, callback, result);
    result.push(node.data);
    if (callback) callback(node);
  }

  height(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (!node) return 0;

    let depth = 0;
    while (node !== this.root) {
      depth++;
      node = this.getParent(node);
    }

    return depth;
  }

  getParent(child, node = this.root, parent = null) {
    if (!node) return null;

    if (node === child) {
      return parent;
    }

    if (child.data < node.data) {
      return this.getParent(child, node.left, node);
    } else {
      return this.getParent(child, node.right, node);
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const inorderArray = this.inorder();
    this.root = this.buildTree(inorderArray);
  }
}
