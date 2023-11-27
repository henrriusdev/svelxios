export const vscodeDebugConfig = {
  configurations: [
    {
      command: "npm run dev --inspect",
      name: "npm run dev --inspect",
      request: "launch",
      type: "node-terminal",
    },
  ],
};

export const clientCode = {
  url: `import {baseUrl} from "$env/static/private`,
  client: `
    export const client = async (event: RequestEvent, endpoint: string, method: string, raw?: object, headers?: any, debug?: boolean) => {

  const access_token = await getAccessToken(event)

    let body = raw? JSON.stringify(raw):null

  headers = headers ?? {
    "Accept": "*/*",
    "Authorization": access_token
  }

  let res = await fetch(baseUrl + endpoint, { method, body, headers })

  if (debug) {
    await debbuger("CLIENT", raw, res, endpoint, headers, method)
  }

  if (res.ok) {
    let data = await res.json()
    return { ok: true, status: res.status, data }
  } else {
    let data
    try {
      data = await res.json()

    } catch (error) {
      data = undefined
    }
    return {
      ok: false,
      status: res.status,
      data: JSON.stringify(data)
    }
  }

}
  `,
};

export const debuggerCode = `
    export const debbuger=async (name:string,payload:any, response:Response , endpoint?:string, headers?: any, method?:string)=>{
    try{
      let res = response.clone()
      let color=res.ok?"\x1b[1;32m":'\x1b[1;31m'
      let data="NO RES DATA"

      try{
          data= await res.json().then(r=>r).catch(e=>"NO RES DATA")
        
          console.log(color,method+": "+endpoint +" " +res.status, "\n",
            {HEADER:headers
            PAYLOAD:payload,
            RESPONSE:{response:res, data},
            })
      }
      catch{
        try{
           data= await res.text().then(r=>r).catch(e=>"NO RES DATA")

          console.log(color,method+": "+endpoint +" " +res.status, "\n",
            {HEADER:headers,
            PAYLOAD:payload,
            RESPONSE:{status:res.status, response:res, data},
            })
        }
        catch(e){
          console.log("ha ocurrido un error con debugger")
          console.error(method+": "+endpoint +" " ,{error:e, response, status: response.status})
        }
      }
    }
      catch(e){
        console.log("ha ocurrido un error con debugger")
        console.error(method+": "+endpoint +" " ,{error:e, response, status: response.status})
      }
    }
  `;

export const appLocalsCode = {
  inLocals: `svelxios: Client`,
  interfaces: `
  interface Response {
    ok: boolean;
    status: number;
    data: any;
  }

  interface Client {
    GET: (endpoint: string, body?: object, params?: object, headers?: any) => Promise<Response>;
    POST: (endpoint: string, body?: object, params?: object, headers?: any) => Promise<Response>;
    PUT: (endpoint: string, body?: object, params?: object, headers?: any) => Promise<Response>;
    PATCH: (endpoint: string, body?: object, params?: object, headers?: any) => Promise<Response>;
    DELETE: (endpoint: string, body?: object, params?: object, headers?: any) => Promise<Response>;
  }
  `,
};

export const hooksCode = {
  handlers: `
  const clientHandler: Handle=async ({event, resolve}) => {
    event.locals.client={
      "GET":async(endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"GET",body,headers,debug),
      "POST":async(endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"POST",body,headers,debug),
      "PUT":async (endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"PUT",body,headers,debug),
      "PATCH":async (endpoint:string,body?:object, headers?:any)=> await client(event,endpoint,"PATCH",body,headers,debug),
      "DELETE":async (endpoint:string,body?:object, headers?:any)=> await client(event,endpoint,"DELETE",body,headers,debug)
    }

    return await resolve (event)
  }

  const trackers: Handle=async ({event, resolve}) => {
    return await resolve (event)
  }

  export const handle = sequence(clientHandler, trackers);
  `,
  import: `
  import {client} from "$lib/server/auth"
  `,
};
