const EventEmitter= require('events');
class Server extends EventEmitter{
    constructor(client){
        super();
        this.tasks={};
        this.taskId= 1;
        process.nextTick(()=>{
            this.emit('response', `Type a command:
        1:- add taskname
        2:- ls
        3:- delete :id`);
        })

        client.on('command', (command, args) => {
            switch(command){
                case 'help':
                case 'ls' :
                case 'add':
                case 'delete':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'unknown command');
            }
        })
    }
    help(){
        this.emit('response',`Available Commands:
        add task
        ls
        delete :id
        `);
    }
    add(args){
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response',`Task Added ${this.taskId}`);
        this.taskId++;
    }
    taskstring(){
        return Object.keys(this.tasks).map(key =>{
            return `${key}: ${this.tasks[key]}`
        }).join('\n');
    }
    ls(){
        this.emit('response',`Totall Tasks ARE:\n${this.taskstring()} `)
    }
    delete(args){
        delete this.tasks[args[0]];
        this.emit('response',`Deleted Task ${args[0]}`);
    }
}
module.exports= (client) => new Server(client);
