function TxtType (el, toRotate, period) {
    el.style.setProperty('border-right', '0.08em solid #fff');

    _toRotate = toRotate;
    _el = el;
    _loopNum = 0;
    _period = parseInt(period, 10) || 2000;
    _txt = '';
    _isDeleting = false;

    _tick = function () {
        var i = _loopNum % _toRotate.length;
        var fullTxt = _toRotate[i];

        if (_isDeleting) {
            _txt = fullTxt.substring(0, _txt.length - 1);
        }
        else {
            _txt = fullTxt.substring(0, _txt.length + 1);
        }

        _el.innerHTML = '<span class="wrap">' + _txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (_isDeleting) { delta /= 2; }

        if (!_isDeleting && _txt === fullTxt) {
            delta = _period;
            _isDeleting = true;
        }
        else if (_isDeleting && _txt === '') {
            _isDeleting = false;
            _loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            _tick();
        }, delta);
    }

    _start = function() {
        _tick();
    }

    return {
        start: _start 
    };
};
