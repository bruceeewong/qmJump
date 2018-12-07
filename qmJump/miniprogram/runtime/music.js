var musicInstance;
// Music类
module.exports =  class Music {
    constructor() {
        if (musicInstance) {
            return musicInstance;
        }
        musicInstance = this;
        var _this = this;

        this.musicPool = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'shi', 'bai', 'qian'];
        this.AUDIO = {
            zero: '/audio/0.mp3',
            one: '/audio/1.mp3',
            two: '/audio/2.mp3',
            three: '/audio/3.mp3',
            four: '/audio/4.mp3',
            five: '/audio/5.mp3',
            six: '/audio/6.mp3',
            seven: '/audio/7.mp3',
            eight: '/audio/8.mp3',
            nine: '/audio/9.mp3',
            shi: '/audio/SHI.mp3',
            bai: '/audio/BAI.mp3',
            qian: '/audio/QIAN.mp3'
        };

        this.musicPool.forEach(function (key) {
            _this[key] = wx.createInnerAudioContext();
            _this[key].src = _this.AUDIO[key];
        });
    }

    // 通过传入数字参数获得对应读音的key
    getKey(num) {
        switch (num) {
            case 0:
                return 'zero'; break;
            case 1:
                return 'one'; break;
            case 2:
                return 'two'; break;
            case 3:
                return 'three'; break;
            case 4:
                return 'four'; break;
            case 5:
                return 'five'; break;
            case 6:
                return 'six'; break;
            case 7:
                return 'seven'; break;
            case 8:
                return 'eight'; break;
            case 9:
                return 'nine'; break;
            case 10:
                return 'shi'; break;
        }
    }

    playAudioCtx(key) {
        this[key].seek(0);
        this[key].play();
    }

    stopAudioCtx(key) {
        this[key].stop();
    }

    speakDistance(distanceArray) {
        var
            _this = this,
            _tens = distanceArray[1],   // 十位的数字
            _units = distanceArray[0];  // 个位的数字

        var
            tens = {
                key: null,  // 十位的数字的读音
                time: 0 // 延迟播放的时间
            },
            shi = {
                key: null,  // "十"的读音
                time: 0 // 延迟播放的时间
            },
            units = {
                key: null,   // 个位的数字的读音
                time: 0 // 延迟播放的时间
            };

        // 当距离为个位数时，只播报个位数字的读音
        if (_tens === 0) {
            tens.key = null;
            shi.key = null;
            units.key = this.getKey(_units);
            units.time = 0;

            // 当距离为10~19时，只播报"十"的读音 + 个位数字的读音
        } else if (_tens === 1) {
            tens.key = null;
            shi.key = this.getKey(10);
            shi.time = 0;

            // 个位为零， 则不发声
            if (_units === 0) {
                units.key = null;
            } else {
                units.key = this.getKey(_units);
                units.time = 500;
            }

            // 当距离为20~99, 播报十位数字读音 + "十"读音 + 个位数字读音
        } else {
            tens.key = this.getKey(_tens);
            tens.time = 0;
            shi.key = this.getKey(10);
            shi.time = 500;

            // 个位为零， 则不发声
            if (_units === 0) {
                units.key = null;
            } else {
                units.key = this.getKey(_units);
                units.time = 1000;
            }
        }

        // 设置距离播报
        if (tens.key) {
            setTimeout(function () {
                _this.stopAudioCtx(tens.key);
                _this.playAudioCtx(tens.key);
            }, tens.time);
        }

        if (shi.key) {
            setTimeout(function () {
                _this.stopAudioCtx(shi.key);
                _this.playAudioCtx(shi.key);
            }, shi.time);
        }

        if (units.key) {
            setTimeout(function () {
                _this.stopAudioCtx(units.key);
                _this.playAudioCtx(units.key);
            }, units.time);
        }
    }
}