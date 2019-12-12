/*
  html迷宫移植到微信小程序
  auth：xuchl
  2019/09/04 新建页面（页面迷宫固定，demo做成）
  2019/09/05 页面迷宫动态生成（同样逻辑（少很多拼接，替换），微信效率高，秒出）
  2019/09/06 添加自动寻路功能（同样逻辑（运算多），网页效率高，秒出）
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mazeSize: 10,
    cellHeight: "20px",
    updateLog: "2019/09/04 新建页面（页面迷宫固定，demo做成）\n2019/09/05 页面迷宫动态生成（微信效率高，秒出）\n2019/09/06 添加自动寻路功能（网页效率高，秒出）",
    showTag: "#CAEACE",
    outMaze: [
      {tr:1, td:[
        { id: 'c1', class: 'td hleft hbottom moveColor currentColor' },
        { id: 'c2', class: 'td hbottom hright' },
        { id: 'c3', class: 'td hleft hright' },
        { id: 'c4', class: 'td hleft hbottom hright' },
        { id: 'c5', class: 'td hleft hright' },
        { id: 'c6', class: 'td hleft hbottom' },
        { id: 'c7', class: 'td hright' },
        { id: 'c8', class: 'td hbottom hleft hright' },
        { id: 'c9', class: 'td hleft hright' },
        { id: 'c10', class: 'td hleft' }]},
      {tr: 2, td: [
        { id: 'c11', class: 'td htop hbottom' },
        { id: 'c12', class: 'td hbottom htop hright' },
        { id: 'c13', class: 'td hleft' },
        { id: 'c14', class: 'td htop hright' },
        { id: 'c15', class: 'td hleft' },
        { id: 'c16', class: 'td htop' },
        { id: 'c17', class: 'td hright' },
        { id: 'c18', class: 'td hright hleft htop' },
        { id: 'c19', class: 'td hbottom hleft hright' },
        { id: 'c20', class: 'td hleft hbottom' }]},
      {tr: 3, td: [
        { id: 'c21', class: 'td htop hright' },
        { id: 'c22', class: 'td hleft htop hright' },
        { id: 'c23', class: 'td hleft hbottom' },
        { id: 'c24', class: 'td hright' },
        { id: 'c25', class: 'td hbottom hleft' },
        { id: 'c26', class: 'td hright' },
        { id: 'c27', class: 'td hbottom hleft' },
        { id: 'c28', class: 'td hbottom' },
        { id: 'c29', class: 'td hbottom htop' },
        { id: 'c30', class: 'td htop hbottom' }]},
      {tr: 4, td: [
        { id: 'c31', class: 'td hbottom' },
        { id: 'c32', class: 'td hbottom' },
        { id: 'c33', class: 'td htop hright hbottom' },
        { id: 'c34', class: 'td hleft hright hbottom' },
        { id: 'c35', class: 'td hleft htop' },
        { id: 'c36', class: 'td hbottom' },
        { id: 'c37', class: 'td hright htop' },
        { id: 'c38', class: 'td hbottom htop hleft' },
        { id: 'c39', class: 'td hbottom htop' },
        { id: 'c40', class: 'td htop' }]},
      {tr: 5, td: [
        { id: 'c41', class: 'td hright htop' },
        { id: 'c42', class: 'td hbottom htop hleft' },
        { id: 'c43', class: 'td htop' },
        { id: 'c44', class: 'td htop hright' },
        { id: 'c45', class: 'td hleft hbottom' },
        { id: 'c46', class: 'td hright htop hbottom' },
        { id: 'c47', class: 'td hright hleft' },
        { id: 'c48', class: 'td hbottom hleft htop hright' },
        { id: 'c49', class: 'td hleft htop' },
        { id: 'c50', class: 'td hbottom' }]},
      {tr: 6, td: [
        { id: 'c51', class: 'td hright' },
        { id: 'c52', class: 'td hright hleft htop' },
        { id: 'c53', class: 'td hright hleft' },
        { id: 'c54', class: 'td hright hbottom hleft' },
        { id: 'c55', class: 'td htop hleft' },
        { id: 'c56', class: 'td htop' },
        { id: 'c57', class: 'td hright' },
        { id: 'c58', class: 'td hright htop hleft' },
        { id: 'c59', class: 'td hright hleft' },
        { id: 'c60', class: 'td hbottom hleft htop' }]},
      {tr: 7, td: [
        { id: 'c61', class: 'td hright' },
        { id: 'c62', class: 'td hright hbottom hleft' },
        { id: 'c63', class: 'td hright hbottom hleft' },
        { id: 'c64', class: 'td htop hleft hright hbottom' },
        { id: 'c65', class: 'td hleft' },
        { id: 'c66', class: 'td hright hbottom' },
        { id: 'c67', class: 'td hbottom hleft hright' },
        { id: 'c68', class: 'td hleft' },
        { id: 'c69', class: 'td hright hbottom' },
        { id: 'c70', class: 'td hbottom htop hleft' }]},
      {tr: 8, td: [
        { id: 'c71', class: 'td hright hbottom' },
        { id: 'c72', class: 'td htop hleft' },
        { id: 'c73', class: 'td htop hbottom' },
        { id: 'c74', class: 'td htop' },
        { id: 'c75', class: 'td hright' },
        { id: 'c76', class: 'td htop hleft' },
        { id: 'c77', class: 'td hbottom htop hright' },
        { id: 'c78', class: 'td hleft hbottom' },
        { id: 'c79', class: 'td htop' },
        { id: 'c80', class: 'td hbottom htop' }]},
      {tr: 9, td: [
        { id: 'c81', class: 'td htop hright' },
        { id: 'c82', class: 'td hleft' },
        { id: 'c83', class: 'td htop hright' },
        { id: 'c84', class: 'td hleft hright' },
        { id: 'c85', class: 'td hleft hright hbottom' },
        { id: 'c86', class: 'td hleft hright' },
        { id: 'c87', class: 'td hleft htop' },
        { id: 'c88', class: 'td htop hright' },
        { id: 'c89', class: 'td hleft hright hbottom' },
        { id: 'c90', class: 'td hleft hbottom htop' }]},
      {tr: 10, td: [
        { id: 'c91', class: 'td hright' },
        { id: 'c92', class: 'td hright hleft' },
        { id: 'c93', class: 'td hright hleft' },
        { id: 'c94', class: 'td hright hleft' },
        { id: 'c95', class: 'td htop hleft hright' },
        { id: 'c96', class: 'td hleft hright' },
        { id: 'c97', class: 'td hleft hright' },
        { id: 'c98', class: 'td hleft' },
        { id: 'c99', class: 'td htop' },
        { id: 'c100', class: 'td hright htop'}]}
    ],
    // c1: 'td hleft hbottom moveColor currentColor',
    // c2: 'td hbottom hright',
    // c3: 'td hleft hright',
    // c4: 'td hleft hbottom hright',
    // c5: 'td hleft hright',
    // c6: 'td hleft hbottom',
    // c7: 'td hright',
    // c8: 'td hbottom hleft hright',
    // c9: 'td hleft hright',
    // c10: 'td hleft',
    // c11: 'td htop hbottom',
    // c12: 'td hbottom htop hright',
    // c13: 'td hleft',
    // c14: 'td htop hright',
    // c15: 'td hleft',
    // c16: 'td htop',
    // c17: 'td hright',
    // c18: 'td hright hleft htop',
    // c19: 'td hbottom hleft hright',
    // c20: 'td hleft hbottom',
    // c21: 'td htop hright',
    // c22: 'td hleft htop hright',
    // c23: 'td hleft hbottom',
    // c24: 'td hright',
    // c25: 'td hbottom hleft',
    // c26: 'td hright',
    // c27: 'td hbottom hleft',
    // c28: 'td hbottom',
    // c29: 'td hbottom htop',
    // c30: 'td htop hbottom',
    // c31: 'td hbottom',
    // c32: 'td hbottom',
    // c33: 'td htop hright hbottom',
    // c34: 'td hleft hright hbottom',
    // c35: 'td hleft htop',
    // c36: 'td hbottom',
    // c37: 'td hright htop',
    // c38: 'td hbottom htop hleft',
    // c39: 'td hbottom htop',
    // c40: 'td htop',
    // c41: 'td hright htop',
    // c42: 'td hbottom htop hleft',
    // c43: 'td htop',
    // c44: 'td htop hright',
    // c45: 'td hleft hbottom',
    // c46: 'td hright htop hbottom',
    // c47: 'td hright hleft',
    // c48: 'td hbottom hleft htop hright',
    // c49: 'td hleft htop',
    // c50: 'td hbottom',
    // c51: 'td hright',
    // c52: 'td hright hleft htop',
    // c53: 'td hright hleft',
    // c54: 'td hright hbottom hleft',
    // c55: 'td htop hleft',
    // c56: 'td htop',
    // c57: 'td hright',
    // c58: 'td hright htop hleft',
    // c59: 'td hright hleft',
    // c60: 'td hbottom hleft htop',
    // c61: 'td hright',
    // c62: 'td hright hbottom hleft',
    // c63: 'td hright hbottom hleft',
    // c64: 'td htop hleft hright hbottom',
    // c65: 'td hleft',
    // c66: 'td hright hbottom',
    // c67: 'td hbottom hleft hright',
    // c68: 'td hleft',
    // c69: 'td hright hbottom',
    // c70: 'td hbottom htop hleft',
    // c71: 'td hright hbottom',
    // c72: 'td htop hleft',
    // c73: 'td htop hbottom',
    // c74: 'td htop',
    // c75: 'td hright',
    // c76: 'td htop hleft',
    // c77: 'td hbottom htop hright',
    // c78: 'td hleft hbottom',
    // c79: 'td htop',
    // c80: 'td hbottom htop',
    // c81: 'td htop hright',
    // c82: 'td hleft',
    // c83: 'td htop hright',
    // c84: 'td hleft hright',
    // c85: 'td hleft hright hbottom',
    // c86: 'td hleft hright',
    // c87: 'td hleft htop',
    // c88: 'td htop hright',
    // c89: 'td hleft hright hbottom',
    // c90: 'td hleft hbottom htop',
    // c91: 'td hright',
    // c92: 'td hright hleft',
    // c93: 'td hright hleft',
    // c94: 'td hright hleft',
    // c95: 'td htop hleft hright',
    // c96: 'td hleft hright',
    // c97: 'td hleft hright',
    // c98: 'td hleft',
    // c99: 'td htop',
    // c100: 'td hright htop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 全局变量常量
   */
  globalData: {
    id:1,
    n:10,
    isClear:false
  },
  /**
   * 滑动开始
   */
  mytouchstart: function mytouchstart(evt) {
    if (this.globalData.isClear) return; // 通关终止 *新加
    var touch = evt.touches[0];
    this.globalData.touchStartX = parseInt(touch.pageX),
    this.globalData.touchStartY = parseInt(touch.pageY);
  },
   /**
   * 滑动中
   */
  mytouchmove: function mytouchmove(evt) {
    if (this.globalData.isClear) return; // 通关终止 *新加
    var touch = evt.touches[0];
    this.globalData.touchEndX = parseInt(touch.pageX),
    this.globalData.touchEndY = parseInt(touch.pageY);
  },
   /**
   * 滑动结束
   */
  mytouchend: function mytouchend(evt) {
    var isClear = this.globalData.isClear;
    if (isClear) return; // 通关终止 *新加
    var touchMoveX = this.globalData.touchEndX - this.globalData.touchStartX;
    var touchMoveY = this.globalData.touchEndY - this.globalData.touchStartY;
    var n = this.globalData.n;
    var TOP = "top";
    var BOTTOM ="bottom";
    var LEFT = "left";
    var RIGHT = "right";

    if (Math.abs(touchMoveX) < Math.abs(touchMoveY) && touchMoveY < -30) {
      this.globalData.id = this.doMoveDecision(this.globalData.id, TOP, this.globalData.id - n)
      //isCommandPhone(38);
    } else if (Math.abs(touchMoveY) < Math.abs(touchMoveX) && 30 < touchMoveX) {
      this.globalData.id = this.doMoveDecision(this.globalData.id, RIGHT, this.globalData.id + 1)
      //isCommandPhone(39);
      if (!isClear && this.globalData.id == n * n) {
        this.globalData.isClear = true;
        //alert("maze clear。Congratulations!");
        wx.showToast({
          title: 'maze clear',
          icon: 'success',
          duration: 2000
        })
      }
    } else if (Math.abs(touchMoveY) < Math.abs(touchMoveX) && touchMoveX < -30) {
      this.globalData.id = this.doMoveDecision(this.globalData.id, LEFT, this.globalData.id - 1)
      //isCommandPhone(37);
    } else if (Math.abs(touchMoveX) < Math.abs(touchMoveY) && 30 < touchMoveY) {
      this.globalData.id = this.doMoveDecision(this.globalData.id, BOTTOM, this.globalData.id + n)
      //isCommandPhone(40);
      if (!isClear && this.globalData.id == n * n) {
        this.globalData.isClear = true;
        //alert("maze clear。Congratulations!");
        wx.showToast({
          title: 'maze clear',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  // スタイルを変更する。
  doMoveDecision:function (idbf, direction, idaf) {
    var n = this.globalData.n;
    if (!(1 <= idaf && idaf <= n * n)) return idbf; // 错误位置终止 *新加
    //console.log(idbf + this.data["c" + idbf]);
    //console.log(idaf + this.data["c" + idaf]);
    var rowIndexBf = idbf % n == 0 ? idbf / n - 1 : parseInt(idbf / n);
    var classIndexBf = idbf % n == 0 ? n - 1 : idbf - 1 - (parseInt(idbf / n) * n);
    var rowIndexAf = idaf % n == 0 ? idaf / n - 1 : parseInt(idaf / n);
    var classIndexAf = idaf % n == 0 ? n - 1 : idaf - 1 - (parseInt(idaf / n) * n);
    //console.log(idbf + this.data.outMaze[rowIndexBf].td[classIndexBf].class);
    //console.log(idaf + this.data.outMaze[rowIndexAf].td[classIndexAf].class);
    // 限界の場合、処理しない
    if((idbf == 1 && direction == "left") || idbf == n * n) {
      return idbf;
    }

    // 移動ルートに色を追加する
    // if (0 < this.data["c" + idbf].indexOf("h" + direction)) {
    //   var afData = "c" + idaf;
    //   var bfData = "c" + idbf;
    //   if (0 < this.data["c" + idaf].indexOf("moveColor")) {
    //     this.setData({
    //       [bfData]: this.data["c" + idbf].replace(/moveColor/g, '') + ' badColor'
    //     })
    //   }
    //   this.setData({
    //     [afData]: this.data["c" + idaf].replace(/badColor/g, '') + ' moveColor'
    //   })

    //   // 現在場所変更
    //   this.setData({
    //     [bfData]: this.data["c" + idbf].replace(/currentColor/g, ''),
    //     [afData]: this.data["c" + idaf] + ' currentColor'
    //   })
    //   return idaf;
    // }
    if (0 < this.data.outMaze[rowIndexBf].td[classIndexBf].class.indexOf("h" + direction)) {
      var afData = "outMaze[" + rowIndexAf + "].td[" + classIndexAf + "].class";
      var bfData = "outMaze[" + rowIndexBf + "].td[" + classIndexBf + "].class";
      if (0 < this.data.outMaze[rowIndexAf].td[classIndexAf].class.indexOf("moveColor")) {
        this.setData({
          [bfData]: this.data.outMaze[rowIndexBf].td[classIndexBf].class.replace(/moveColor/g, '') + ' badColor'
        })
      }
      this.setData({
        [afData]: this.data.outMaze[rowIndexAf].td[classIndexAf].class.replace(/badColor/g, '') + ' moveColor'
      })

      // 現在場所変更
      this.setData({
        [bfData]: this.data.outMaze[rowIndexBf].td[classIndexBf].class.replace(/currentColor/g, ''),
        [afData]: this.data.outMaze[rowIndexAf].td[classIndexAf].class + ' currentColor'
      })
      return idaf;
    }
    return idbf;
  },
  bindKeyInput: function (e) {
    this.setData({
      mazeSize: e.detail.value
    })
  },
  // 判断
  doCheck: function () {
    var tempSize = Number(this.data.mazeSize);
    if(isNaN(tempSize) || tempSize < 2 || 70 < tempSize) {
      wx.showToast({
        title: '错误范围(2-70)',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
   },
  // 迷路生成開始
  doStart: function () {
    if(!this.doCheck()) {
      return;
    }

    // パラメータを初期化する
    this.globalData.id = 1;
    this.globalData.n = Number(this.data.mazeSize);
    this.globalData.isClear = false;
    var n = this.globalData.n;
    // bug修改：调整宽度后无法复原的问题
    this.setData({
      cellHeight: '20px'
    })

    var x = 1;
    var xn = 1;
    var rotes = new Array(n * n);
    var roteSize = 1;
    var map = this.createMazes(n);
    while (roteSize < n * n) {
      var op = Math.floor(Math.random() * 4) + 1;
      xn = this.doNext(op, x, n);
      if (xn == x) {
        continue;
      } else if ("*" == rotes[xn - 1]) {
        x = xn;
      } else {
        map = this.createRotes(map, x, xn, op);
        x = xn;
        rotes[x - 1] = "*";
        roteSize++;
      }
    }

    this.heightReset();
    this.setData({
      outMaze:map
    })
   },
  // 迷路地図を初期化する。
  createMazes:function (length) {
    var map = [];
    var no = 1;
    for(var xline = 1; xline <= length; xline++) {
      var tr = { tr: xline, td: [] }
      for (var yline = 1; yline <= length; yline++) {
        var td = { id: no, class: 'td' };
        tr.td.push(td);
        no++;
      }
      map.push(tr);
    }
    map[0].td[0].class = 'td hleft';
    map[length - 1].td[length - 1].class = 'td hright';
    return map;
   },
  // 迷路の道を作る。
  createRotes:function (map, point, pointNx, op) {
    // 現在の座標にクラスを追加する。
    var clsStr = this.getClass(op);
    if(point == 1) {
      clsStr = clsStr + " moveColor currentColor";
    }
    // var p = new RegExp("id='" + point + "' class='([a-z ]*)'");
    // if (map.match(p)) {
    //   map = map.replace(p, "id='" + point + "' class='$1 " + clsStr + "'");
    // } else {
    //   map = map.replace("id='" + point + "'", "id='" + point + "' class='" + clsStr + "'");
    // }
    var n = this.globalData.n;
    var rowIndex = point % n == 0 ? point / n - 1 : parseInt(point / n);
    var classIndex = point % n == 0 ? n - 1 : point - 1 - (parseInt(point / n) * n);
    map[rowIndex].td[classIndex].class = map[rowIndex].td[classIndex].class + ' ' + clsStr;

    // 次の座標にクラスを追加する。
    var clsStrNx = this.getClassAf(op);
    // var pNx = new RegExp("id='" + pointNx + "' class='([a-z ]*)'");
    // if (map.match(pNx)) {
    //   map = map.replace(pNx, "id='" + pointNx + "' class='$1 " + clsStrNx + "'");
    // } else {
    //   map = map.replace("id='" + pointNx + "'", "id='" + pointNx + "' class='" + clsStrNx + "'");
    // }
    rowIndex = pointNx % n == 0 ? pointNx / n - 1 : parseInt(pointNx / n);
    classIndex = pointNx % n == 0 ? n - 1 : pointNx - 1 - (parseInt(pointNx / n) * n);
    map[rowIndex].td[classIndex].class = map[rowIndex].td[classIndex].class + ' ' + clsStrNx;

    return map;
   },
  // 次の座標を取得する
  doNext: function (rnd, x, n) {
    switch(rnd) {
    // 上
    case 1: {
      if(this.isNotIllegal(x - n, n)) {
        x = x - n;
      }
      break;
      }
      // 右
      case 2: {
        if (x % n != 0 && this.isNotIllegal(x + 1, n)) {
          x = x + 1;
        }
        break;
      }
      // 左
      case 3: {
        if (x % n != 1 && this.isNotIllegal(x - 1, n)) {
          x = x - 1;
        }
        break;
      }
      // 下
      case 4: {
        if (this.isNotIllegal(x + n, n)) {
          x = x + n;
        }
        break;
      }
    }
    return x;
   },
  // 座標の正しさを判断する
  isNotIllegal:function (x, n) {
    if(1 <x && x <= n * n) {
  return true;
} else {
  return false;
}
   },
  // HTMLClassを取得する
  getClass: function (operation){
    var clsStr = "";
    switch(operation) {
    case 1: {
    clsStr = "htop";
    break;
  }
    case 2: {
    clsStr = "hright";
    break;
  }
    case 3: {
    clsStr = "hleft";
    break;
  }
    case 4: {
    clsStr = "hbottom";
    break;
  }
    }
    return clsStr;
   },
  // 後HTMLClassを取得する
  getClassAf: function (operation) {
  var clsStr = "";
  switch (operation) {
    case 1: {
      clsStr = "hbottom";
      break;
    }
    case 2: {
      clsStr = "hleft";
      break;
    }
    case 3: {
      clsStr = "hright";
      break;
    }
    case 4: {
      clsStr = "htop";
      break;
    }
  }
  return clsStr;
  },
  // 高さをリセットする。
  heightReset: function () {
    var winWid = wx.getSystemInfoSync().windowWidth / this.globalData.n;
    // スクリーンの幅は迷路より小さい時
    if(winWid < 20) {
      this.setData({
        cellHeight: winWid + 'px'
      })
    }
  },
  // 迷路を自動的にクリアする。
  autoClear: function () {
    if (this.globalData.isClear) return; // 通关终止 *新加
    var n = this.globalData.n;
    // 「→ ↓ ↑ ←」の方向通り、重複なルートが一切ない、効率が高い。
    var rootStack = [];
    rootStack.push(this.globalData.id);
    var rootOps = [2, 4, 1, 3];
    var clearRoots = new Array(n * n);
    var nextId;
    var rootDirection;
    while (this.globalData.id != n * n) {
      for (var opInx in rootOps) {
        nextId = this.doNext(rootOps[opInx], this.globalData.id, n);
        // 移動できない場合
        if (this.globalData.id == nextId) {
          if (opInx == 3) {
            // 通り抜けられない道は、前の道を戻る。
            rootStack.pop();
            this.globalData.id = rootStack[rootStack.length - 1];
          }
          continue;
        }

        switch (rootOps[opInx]) {
          case 1: {
            rootDirection = "top";
            break;
          }
          case 2: {
            rootDirection = "right";
            break;
          }
          case 3: {
            rootDirection = "left";
            break;
          }
          case 4: {
            rootDirection = "bottom";
            break;
          }
        }

        var rowIndex = this.globalData.id % n == 0 ? this.globalData.id / n - 1 : parseInt(this.globalData.id / n);
        var classIndex = this.globalData.id % n == 0 ? n - 1 : this.globalData.id - 1 - (parseInt(this.globalData.id / n) * n);
        this.data.outMaze[rowIndex].td[classIndex].class.indexOf("h" + rootDirection)
        // 通路、探した道　判断
        if (this.data.outMaze[rowIndex].td[classIndex].class.indexOf("h" + rootDirection) < 0 || "C" == clearRoots[nextId - 1]) {
          if (opInx == 3) {
            // 通り抜けられない道は、前の道を戻る。
            rootStack.pop();
            this.globalData.id = rootStack[rootStack.length - 1];
          }
          continue;
        } else {
          clearRoots[nextId - 1] = "C";
          rootStack.push(nextId);
          this.globalData.id = nextId;
          break;
        }
      }
    }
    // 路線を描く
    for (var inx in rootStack) {
      var rootId = rootStack[inx];

      var rowIndexRoot = rootId % n == 0 ? rootId / n - 1 : parseInt(rootId / n);
      var classIndexRoot = rootId % n == 0 ? n - 1 : rootId - 1 - (parseInt(rootId / n) * n);
      var rootData = "outMaze[" + rowIndexRoot + "].td[" + classIndexRoot + "].class";

      if (inx == 0) {
        this.setData({
          [rootData]: this.data.outMaze[rowIndexRoot].td[classIndexRoot].class.replace(/currentColor/g, '')
        })
        continue;
      }
      if (0 < this.data.outMaze[rowIndexRoot].td[classIndexRoot].class.indexOf("moveColor")) {
        var rowIndexRootBf = rootStack[inx - 1] % n == 0 ? rootStack[inx - 1] / n - 1 : parseInt(rootStack[inx - 1] / n);
        var classIndexRootBf = rootStack[inx - 1] % n == 0 ? n - 1 : rootStack[inx - 1] - 1 - (parseInt(rootStack[inx - 1] / n) * n);
        var rootDataBf = "outMaze[" + rowIndexRootBf + "].td[" + classIndexRootBf + "].class";
        this.setData({
          [rootDataBf]: this.data.outMaze[rowIndexRootBf].td[classIndexRootBf].class.replace(/moveColor/g, '') + ' badColor'
        })
      }
      this.setData({
        [rootData]: this.data.outMaze[rowIndexRoot].td[classIndexRoot].class.replace(/badColor/g, '') + ' moveColor'
      })
    }
    var lastData = "outMaze[" + n - 1 + "].td[" + n - 1 + "].class";
    this.setData({
      [rootData]: this.data.outMaze[n - 1].td[n - 1].class + ' currentColor'
    })

    this.globalData.isClear = true;
    wx.showToast({
      title: 'maze clear',
      icon: 'success',
      duration: 2000
    })
  },
  showLog: function (){
    this.setData({
      showTag: '#000'
    })
  }
})