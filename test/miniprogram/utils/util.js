function getDistanceArray(_distance) {
    let
        tens = 0,
        units = 0,
        distanceArray = [0, 2];

    if (_distance >= 10) {
        tens = Math.floor(_distance / 10);
        units = _distance % 10;
        distanceArray[1] = tens;
        distanceArray[0] = units;
    } else {
        units = _distance % 10;
        distanceArray[0] = units;
    }
    console.log(distanceArray);
    return distanceArray;
}

function myDataBroadcast(_this, _isFirstInit) {
    let
        _order = 0,
        _type = '';

    _order = _this.nextBlock.order;
    switch (_order) {
        case 19: _type = '音乐盒 停顿后可加30分'; break;
        case 24: _type = '商店 停顿后可加15分'; break;
        case 26: _type = '井盖 停顿后可加5分'; break;
        case 17: _type = '魔方 停顿后可加10分'; break;
        default: _type = '普通方块';
    };

    let
        _distance = 0,
        _straight = _this.straight;

    if (_isFirstInit) {
        _distance = 20;
    } else {
        if (_straight) {
            _distance = Math.sqrt(
                Math.pow(_this.nextBlock.obj.position.x - _this.bottle.obj.position.x, 2)
            ).toFixed(0);
        } else {
            _distance = Math.sqrt(
                Math.pow(_this.nextBlock.obj.position.z - _this.bottle.obj.position.z, 2)
            ).toFixed(0);
        } 
    }

    // 布鲁斯基 距离语音播报
    let distanceArray = getDistanceArray(_distance);
    _this.music.speakDistance(distanceArray);

    let _radius = _this.nextBlock.radius;
    console.log('前方物体为 ' + _type + '，距离玩家 ' + _distance + ' 米, 尺寸 ' + _radius + ' 米');
}

module.exports = {
    getDistanceArray,
    myDataBroadcast
};