const roles={coordinator:'Koordinasi pekerjaan HR dan review laporan',payroll:'Validasi payroll dan rekonsiliasi selisih',benefit:'Administrasi benefit dan simulasi biaya',compensation:'Analisis struktur upah dan manpower cost',admin:'Administrasi kontrak dan employee movement',attendance:'Validasi absensi, cuti dan overtime',analyst:'Analisis headcount, turnover dan reporting'};
export default {async fetch(request,env){
 const u=new URL(request.url); if(u.pathname!='/api/task') return env.ASSETS.fetch(request);
 const out=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
 if(request.method!=='POST')return out({error:'Method not allowed'},405);
 if(!env.PILOT_TOKEN)return out({error:'AI belum diaktifkan oleh admin.'},503);
 if(request.headers.get('Authorization')!==`Bearer ${env.PILOT_TOKEN}`)return out({error:'Kode akses tidak sesuai.'},401);
 try{const {agent,task}=await request.json(); if(!Object.hasOwn(roles,agent)||typeof task!=='string'||!task.trim()||task.length>3000)return out({error:'Instruksi tidak valid.'},400);
 const result=await env.AI.run('@cf/meta/llama-3.1-8b-instruct',{messages:[{role:'system',content:`Anda asisten HR: ${roles[agent]}. Jawab dalam bahasa Indonesia, untuk data simulasi saja. Jangan mengarang angka atau akses database. Jika data kurang, sebutkan data yang diperlukan. Jangan menyetujui payroll, memberi keputusan disipliner atau mengubah data. Hasil berupa draft untuk review manusia.`},{role:'user',content:task}],max_tokens:900});return out({output:result.response||'Model tidak menghasilkan teks.'});}catch(e){return out({error:'AI tidak dapat memproses tugas. Periksa binding, model atau kuota Cloudflare.'},502);}
}};
