import { Ollama } from "@langchain/community/llms/ollama";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama3", // Default value
    stream: true,


});

const history = new ChatMessageHistory();



async function message(message) {
    // 'in short sentence'
    history.addMessage(new HumanMessage(message));
    const stream = await ollama.invoke(await history.getMessages(), { stream: true });
    console.log('You : ', message)
    const chunks = [];
    for await (const chunk of stream) {
        process.stdout.write(chunk);
        chunks.push(chunk);
    }
    history.addMessage(new AIMessage(chunks.join('')));
    console.log('\n=============================================================')


}

await message('Hello, Ollama!');
await message('Who I am?');
await message('I am nuttapon khamkul');
await message('So, now tell me my name');


console.log('HISTORY ', await history.getMessages())


