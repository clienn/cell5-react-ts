// API Calls

export const getUsers = (obj: any, callback: any): void =>{
    const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTI3MDEwYWI1MmMxODZmOWVkYjM3MzdlZTc2NTIxZDg4MDE5ZGVkOTRmMjliMTEzMTZhYmZjMzkzNzE3NjZiNjYyNzlhNzg0NTc0YTk3NmQiLCJpYXQiOjE2MTkyNzc5MjAuNTAyMTc4LCJuYmYiOjE2MTkyNzc5MjAuNTAyMTgyLCJleHAiOjE2NTA4MTM5MjAuNTAwMDQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ezU2bub1KifOeBZrFR2TKX4GGwdsLDnM0Jx7v15RJlPgcQbbnlWkSmnc_Xe3lsCyQfL2hsBBHvPXj384yTrb-JhPNNVV-Y79K5F0hVqk-vTy3IxMl9t42ZBzZMn_nWM8jK5Od0IWa0ScMM5TctT_8K5XZAk1AZSObpeaRGUsoSEVBH46_Cc0eTn4FXNzvO83ire1qQ5vXTd2tcjG8SiC94EO9qaILV8BeLSm23cjvsrFVIE01vpn7zjy0LgEhN6Qh2Xlbf_KYSYCryWT_Rslo0cgsXojeubq0Bg5tq5UWIsmCwJzvOBYlt2l8O2JP54F-AntCDXhipYQSTmbVgFxxuKCsi5gNT8ZsF6YHZKARPI2CjkFJ8iYgS3Dq4g439b-ncQyg6yhMvXX51r32Rqxqgs-aEKCiqvBoskVLfRyrSamZFquZ23SGFaQZ_XF3rBVkDadNVEugc3udUP_HzcufP_2gR-SEI9vCLwhNGgtpciCUmrYwmV1te5Abh8NMUjDKN1XY24fKwCJs-KYIb0EDvyWTZymPH6EC80cdAM_5iot48lekfIF9IdlZ1mNHcHVBzQ_8U7qDMXaDiPs32SekKZcCpabHTdKwrpD8nAN8B9kzik1X9LmT8Vi2oJQI-t3dmnu_tvsdShUxRuvTBH9gr1ZAUSJCjkbvp9N0U-b6Nk';

    fetch("http://localhost:8000/api/v1/users", {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        }
        // "body": JSON.stringify({
        //     name: this.state.name,
        //     notes: this.state.notes
        // })
    })
    .then(response => response.json())
    .then(response => {
        if (callback) {
            let data = response.data;

            for (let i in data) {
                let cols:Array<string> = [];
            
                for (let j in data[i]) {
                    cols.push(data[i][j]);
                }
            
                obj.setState({ columns: [...obj.state.columns, cols] });
            }
        }
    })
    .catch(err => {
        console.log(err);
    });
}