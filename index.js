class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      const uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
      return this.buildBalancedTree(uniqueSortedArray);
    }
  
    buildBalancedTree(array) {
      if (array.length === 0) return null;
      const mid = Math.floor(array.length / 2);
      const node = new Node(array[mid]);
      node.left = this.buildBalancedTree(array.slice(0, mid));
      node.right = this.buildBalancedTree(array.slice(mid + 1));
      return node;
    }
  
    insert(value) {
      if (!this.root) {
        this.root = new Node(value);
      } else {
        this.insertNode(this.root, value);
      }
    }
  
    insertNode(node, value) {
      if (value < node.data) {
        if (node.left) {
          this.insertNode(node.left, value);
        } else {
          node.left = new Node(value);
        }
      } else if (value > node.data) {
        if (node.right) {
          this.insertNode(node.right, value);
        } else {
          node.right = new Node(value);
        }
      }
    }
  
    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }
  
    deleteNode(node, value) {
      if (!node) return null;
  
      if (value < node.data) {
        node.left = this.deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = this.deleteNode(node.right, value);
      } else {
        
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
       
        let minLargerNode = this.getMin(node.right);
        node.data = minLargerNode.data;
        node.right = this.deleteNode(node.right, minLargerNode.data);
      }
      return node;
    }
  
    getMin(node) {
      while (node.left) node = node.left;
      return node;
    }
  
    find(value) {
      return this.findNode(this.root, value);
    }
  
    findNode(node, value) {
      if (!node) return null;
      if (value < node.data) return this.findNode(node.left, value);
      if (value > node.data) return this.findNode(node.right, value);
      return node;
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.inOrderTraversal(this.root, callback);
    }
  
    inOrderTraversal(node, callback) {
      if (node) {
        this.inOrderTraversal(node.left, callback);
        callback(node);
        this.inOrderTraversal(node.right, callback);
      }
    }
  
    preOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.preOrderTraversal(this.root, callback);
    }
  
    preOrderTraversal(node, callback) {
      if (node) {
        callback(node);
        this.preOrderTraversal(node.left, callback);
        this.preOrderTraversal(node.right, callback);
      }
    }
  
    postOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.postOrderTraversal(this.root, callback);
    }
  
    postOrderTraversal(node, callback) {
      if (node) {
        this.postOrderTraversal(node.left, callback);
        this.postOrderTraversal(node.right, callback);
        callback(node);
      }
    }
  
    height(node) {
      if (!node) return -1;
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    depth(node) {
      let d = 0;
      let current = this.root;
      while (current) {
        if (node.data < current.data) {
          current = current.left;
        } else if (node.data > current.data) {
          current = current.right;
        } else {
          return d;
        }
        d++;
      }
      return -1; // Node not found
    }
  
    isBalanced(node = this.root) {
      if (!node) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    }
  
    rebalance() {
      const nodes = [];
      this.inOrder(node => nodes.push(node.data));
      this.root = this.buildTree(nodes);
    }
  }

  function generateRandomNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(numbers);
  }
  
  
  const randomNumbers = generateRandomNumbers(15, 100);
  const tree = new Tree(randomNumbers);
  
  console.log("Is tree balanced?", tree.isBalanced());
  
  console.log("Level Order:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre Order:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post Order:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("In Order:");
  tree.inOrder(node => console.log(node.data));
  
  const unbalanceNumbers = [101, 102, 103, 104, 105];
  unbalanceNumbers.forEach(num => tree.insert(num));
  
  console.log("Is tree balanced after unbalancing?", tree.isBalanced());
  
  
  tree.rebalance();
  
  
  console.log("Is tree balanced after rebalancing?", tree.isBalanced());
  
  
  console.log("Level Order after rebalancing:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre Order after rebalancing:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post Order after rebalancing:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("In Order after rebalancing:");
  tree.inOrder(node => console.log(node.data));
  