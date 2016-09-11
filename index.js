function BinarySearchTree() {
	this.root = null;
}

//像书中插入一个新的键
BinarySearchTree.prototype.insert = function( key ) {
	var Node = function(key){
		this.key = key;
		this.left = null;
		this.right = null;
	}
	var node = new Node( key );
	if( this.root == null ) {
		this.root = node;
		return;
	}
	var e = this.root;
	while( true ) {
		//新插入节点小于当前树节点的值。
		if( node.key <= e.key ) {
			if( e.left != null ) {
				e = e.left;
			}
			else {
				e.left = node;
				break;
			}
		}
		//新插入节点大于当前树节点的值。
		else{
			if( e.right != null ) {
				e = e.right;
			}
			else{
				e.right = node;
				break;
			}
		}

	}
}
//在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false；
BinarySearchTree.prototype.search = function( key ) {
	var e = this.root;
	var s = [];
	while( e ) {
		while( e ) {
			if( e.key == key ){
				return true;
			}
			if( e.right ) {
				s.push( e.right );
			}
			e = e.left;
		}
		e = s.pop();
	}
	return false;
}
//中序遍历树
BinarySearchTree.prototype.inOrderTraverse = function() {
	if( this.root == null ) {
		return null;
	}
	var s = new Array();  //保存临时节点。
	var result= [] ;  //遍历结果保存
	s.push( this.root );
	var e = this.root;
	while( s.length || e ) {
		while( e ){   //遍历左子树。
			if( e != this.root ){
				s.push( e );
			}
			e = e.left;
		}

		e = s.pop();

		if( !e ){
			break;
		}
		result.push(e.key);
		e = e.right;
	
	}
	return result;
}
//前序遍历树
BinarySearchTree.prototype.preOrderTraverse = function() {
	if( this.root == null ){
		return
	}
	var s = new Array(); //用于保存右节点地址。
	var result = [];    //保存遍历结果。
	var e = this.root;

	while( e ) {
		while( e ) {    //遍历左子树
			if( e.right != null ){
				s.push( e.right );
			}
			result.push(e.key);
			e = e.left;
		}

		e = s.pop();
	}
	return result;
}
//后序遍历树
BinarySearchTree.prototype.postOrderTraverse = function() {
	if( this.root == null ) {
		return null;
	}
	var s = new Array();  //保存临时节点。
	var result= [] ;  //遍历结果保存
	var prev = null;
	s.push( this.root );
	var e = this.root;
	while( s.length || e ) {
		while( e ){   //遍历左子树。
			if( e != this.root ) {
				s.push( e );
			}
			e = e.left;
		}

		e = s[ s.length - 1 ];
		if( e.right == prev || e.right == null ) {
			result.push( e.key );
			prev = s.pop();
			e = null;

		}else{
			e = e.right;
		} 

	
	}
	return result;
}
//返回树中最小的键值
BinarySearchTree.prototype.min = function() {
	var e = this.root;
	var min;
	if( !this.root ) {
		return;
	}
	while( e ) {
		min = e.key;
		e = e.left;
	}
	return min;
}
//返回树中最大的键值
BinarySearchTree.prototype.max = function() {
	var e = this.root;
	var max;
	if( !this.root ) {
		return;
	}
	while( e ) {
		max = e.key;
		e = e.right;
	}
	return max;
}
//从树中删除某个键。
BinarySearchTree.prototype.remove = function( key ) {
	if( key == this.root.key ) {   //删除根节点。
		if( this.root.left && this.root.right ) {   //如果左右子树都存在
			var root = this.root;
			this.root = this.root.left;
			var temp =this.serarchCurrAddr(this.root,"right");
			temp.right = root.right;
		}
		else{			//左右子树存在一个或不存在。
			this.root = this.root.left || this.root.right;
		}
		return;
	}
	//删除非根节点
	else {
		var e = this.root;
		var s = [];
		while( e ) {
			while( e ) {
				if( e.left && e.left.key == key ){
					this.delete(e,"left");
					return;
				}else if( e.right && e.right.key == key ){
					this.delete(e,"right");
					return;
				}

				if( e.right ) {
					s.push( e );
				}
				
				e = e.left;
			}
			e = s.pop();
		}
	}
}

BinarySearchTree.prototype.delete = function( parent, direction ) {
	var deleteTarget = parent[direction];
	if( deleteTarget.left && deleteTarget.right ) {
		var temp = this.serarchCurrAddr(deleteTarget.left,"right");
		temp.right = deleteTarget.right;
		parent[direction] = deleteTarget.left;
	}else{
		parent[direction] = deleteTarget.right || deleteTarget.left;
	}
}

//搜寻当前子树最 大/小 值的地址。
BinarySearchTree.prototype.serarchCurrAddr = function( currentRoot, direction ) {
	var e = currentRoot;
	while( e ) {
		if( e[direction] == null ) {
			return e;
		}
		e = e[direction];
	}
}
var a = new BinarySearchTree();

a.insert( 3 );
a.insert( 1 );
a.insert( 2 );
a.insert( 4 );
a.insert( 5 );
a.insert( 0 );

a.remove(3);
console.log(a.search(5));
console.log(a.postOrderTraverse());