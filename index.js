'use strict';

const inquirer = require('inquirer');
inquirer.registerPrompt('command', require('inquirer-command-prompt'));

const cmdlets = require(process.env.CMD_CONSOLE_DEV ? '../cmdlets' : 'cmdlets'); 

//all registered cmds including our internal commands
var cmds = [];

function promptAndRun(){
    return inquirer.prompt([{
        type: 'command',
        name: 'cmd',
        message: '>',
        context: 0,
        autoCompletion:cmds
    }]).then(answer => {
        let cmd = answer.cmd;

        if(cmd !== ''){
            if(cmd === '.exit') return true; //quit shell

            return cmdlets.run(cmd)
                .catch(err => {}) //ignore cmd error
                .then(promptAndRun) //for next cmd
        }

        return promptAndRun();
    });
}

module.exports = {
    run(){
        cmds = cmdlets.getCmds((cmd)=> true).map( cmd => cmd.name ).concat(['.exit']);

        cmdlets.on('cmd_added', (cmd)=> {
            cmds.push(cmd.name);
        });

        console.log('press [CTRL+C] or ".exit" to quit.');
        console.log('press [TAB] to show available commands or do auto-complete.\n');

        promptAndRun().then(()=> {
            cmdlets.message('--- bye! ---');
        }).catch(err=>{
            cmdlets.error(err.message);
        })
    },
}