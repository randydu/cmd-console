'use strict';

const inquirer = require('inquirer');

module.exports = function(cmdlet){
    function promptAndRun(){
        return inquirer.prompt([{
            type: 'input',
            name: 'cmd',
            message: 'cmd',
            suffix: ' $ '
        }]).then(answer => {
            let cmd = answer.cmd;

            if(cmd !== ''){
                if(cmd === 'quit' || cmd === 'exit') return true; //quit shell

                return cmdlet.run(cmd === 'help' ? [] /* top menu */ : cmd)
                    .catch(err => {}) //ignore cmd error
                    .then(promptAndRun) //for next cmd
            }

            return promptAndRun();
        });
    }

    return {
        run(){
            promptAndRun().then(()=> {
                cmdlet.message('--- bye! ---');
            }).catch(err=>{
                cmdlet.error(err.message);
            })
        }
    }
}