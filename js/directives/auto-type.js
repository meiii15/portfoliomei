portfolio.controller('autoTypeController', ['$scope', '$timeout',
    function ($scope, $timeout) {
        
        //OBTEM MENSAGENS A SEREM MOSTRADAS A VINDAS DOS PARAMETROS DA DIRETIVA
        this._regex = /"([^"]{0,})"/;
        this._getAllMessages = function(messages){
            
            var result = [];
        
            var match = this._regex.exec(messages);
            
            if(match){
                //REMOVE ASPAS DAS MENSAGENS ENCONTRADAS
                var currentMessage = match[0].replace(/\"/, ' ').replace(/\"/, ' ')
                
                result.push(currentMessage);

                //REMOVE A MENSAGEM ENCONTRADA
                var textResult = messages.replace(this._regex, '');
                
                //PROCURA PRÓXIMA MENSAGEM
                var currentResult =  this._getAllMessages(textResult);
                
                result = result.concat(currentResult);
            }
        
            return result;
        }

        this._interval = $scope.interval;
        this._isDeleting = false;
        this._messageIndex = 0;
        this._messages = this._getAllMessages($scope.messages);
        
        $scope.message = "";
        
        this._tick = function () {
            this._messageIndex = this._messageIndex % this._messages.length;
            var currentMessage = this._messages[this._messageIndex];

            var message = $scope.message;

            //DECREMETA UMA LETRA CASO ESTEJA DELETANDO
            //INCREMENTA CASO ESTEJA NÃO ESTEJA DELETANDO
            message = this._isDeleting ?
                currentMessage.substring(0, message.length - 1) :
                currentMessage.substring(0, message.length + 1);

            $scope.message = message;

            var delta = 200 - Math.random() * 100;
            
            //CASO NÃO ESTEJA DELETANDO E MENSAGEM JÁ ESTEJA COMPLETA, COMEÇA A DELETAR
            if (!this._isDeleting && message === currentMessage) {
                delta = this._interval;
                this._isDeleting = true;
            }
            //CASO JÁ TENHA DELETADO A MENSAGEM POR COMPLETO, 
            //PARA DE DELETAR E PASSA PARA MENSAGEM SEGUINTE
            else if (this._isDeleting && message.length === 0) {
                this._isDeleting = false;
                this._messageIndex++;
                delta = 500;
            }
            //CASO ESTEJA DELETANDO, O TEMPO PARA A DELEÇÃO DEVE SER MENOR 
            else if (this._isDeleting) {
                delta /= 2;
            }

            // EXECUTA PRÓXIMO PASSO
            var that = this;            
            $timeout(function(){
                that._tick();
            }, delta); 
        }

        //EXECUTA DIGITAÇÃO ASSIM QUE A DIRETIVA É INICIADA
        this.$onInit = function()
        {
            this._tick();
        }
    }]);

portfolio.directive('autoType', function(){
    return {
        template: '<span>{{message}}</span>',
        scope: {
            messages: '@',
            interval: '@'
        }, controller: 'autoTypeController'
    };
});