Webr.TreeNodeSupport = function () {
};
Webr.TreeNodeSupport.toAsyncTreeNode = function (node) {
  var newNode;
  if (node && !node.reload) {
    var attr = {id: node.id, text: node.text, nodeType: node.nodeType};
    Ext.apply(attr, node.attributes);
    attr["leaf"] = false;
    newNode = new Ext.tree.AsyncTreeNode(attr);
    var parent = node.parentNode;
    Webr.TreeNodeSupport.replaceNode(parent, node, newNode);
  } else {
    newNode = node;
  }

  return newNode;
};
Webr.TreeNodeSupport.replaceNode = function (parent, oldNode, newNode) {
  //Can't use replace child because it first registers new node under id, 
  //then unregisters old node under the same id and as a result
  //node became unregistered
  var fakeId = "__fake__";
  var fakeNode = new Ext.tree.TreeNode({id: fakeId, text: "Setting Async node"});
  parent.replaceChild(fakeNode, oldNode);
  parent.replaceChild(newNode, fakeNode);
};
Webr.TreeNodeSupport.update = function (opts) {
  var treeNode;
  if (opts.nodeToReloadId) {
    treeNode = opts.treePanel.getNodeById(opts.nodeToReloadId);
  }

  var afterReload;
  if (opts.pathToSelect || opts.pathToExpand) {
    afterReload = function () {
      if (opts.pathToExpand) {
        opts.treePanel.expandPath(opts.pathToExpand);
      }

      if (opts.pathToSelect) {
        opts.treePanel.selectPath(opts.pathToSelect);
      }

    };
  }

  if (treeNode) {
    //If tree node is already loaded
    var asyncNode = Webr.TreeNodeSupport.toAsyncTreeNode(treeNode);
    asyncNode.reload(afterReload);
  } else {
    //Execute selection without reloading
    afterReload();
  }

};
Webr.TreeNodeSupport.move = function (treePanel, newParentId, newNextSiblingId, nodeToMoveId) {
  var nodeToMove = treePanel.getNodeById(nodeToMoveId);
  if (nodeToMove) {
    var newParent = Webr.TreeNodeSupport.toAsyncTreeNode(treePanel.getNodeById(newParentId));
    if (newParent && newParent.isLoaded()) {
      var newNextSibling = null;
      if (newNextSiblingId) {
        newNextSibling = treePanel.getNodeById(newNextSibling);
      }

      newParent.insertBefore(nodeToMove, newNextSibling);
    } else {
      var oldParent = nodeToMove.parentNode;
      oldParent.removeChild(nodeToMove);
    }

  }

};
Webr.TreeNodeSupport.setNodeText = function (treePanel, nodeId, text) {
  var update = function () {
    var treeNode = treePanel.getNodeById(nodeId);
    if (treeNode) {
      treeNode.setText(text);
    } else {
      //Defer text update
      window.setTimeout(update, 500);
    }

  };
  update();
};
Webr.TreeNodeSupport.deleteNode = function (treePanel, nodeId) {
  var node = treePanel.getNodeById(nodeId);
  if (node) {
    node.parentNode.removeChild(node);
  }

};
Webr.TreeNodeSupport.touch = function () {
  //This method does nothing it is used just to reference this js file some how from generated code
};
Webr.TreeNodeReloadOptions = function () {
};
