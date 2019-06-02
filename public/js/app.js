class Errors{


	constructor(){
		this.errors = {};
	}



	get(field){
		if(this.errors[field]){
			return this.errors[field][0]; 
		}
	}



	record(errors){

		this.errors = errors.errors;
	}



	clear(field){

		if(field) delete this.errors[field];

		this.errors = {};
	}




	has(field){
		
		return this.errors.hasOwnProperty(field);
	}



	any(){

		return Object.keys(this.errors).length > 0;

	}

}

class Form{



	constructor(data){


		this.Originaldata = data;

		for(let field in data){
			this[field] = data[field];
		}

		this.errors = new Errors();
	}



	reset(){

        for(let field in this.Originaldata){
        	this[field] = '';
        }
 		this.errors.clear();

	}



	data(){

		let data = {};
		for(let property in this.Originaldata){
			data[property] = this[property];
		}
		// let data = Object.assign({},this); 
		// delete data.Originaldata;
		// delete data.errors;

		return data;

	}

	post(url){
	     return this.submit('post',url);
	}

	delete(url){
		return this.submit('delete',url);
	}



	submit(requestType,url){
		return new Promise((resolve,reject)=>{


			axios[requestType](url,this.data())
	          .then(response=>{

	          	this.onSuccess(response.data);

	          	resolve(response.data);

	          })
	          .catch(error=>{
	          	this.onFail(error.response.data);

	          	reject(error.response.data);

	          })

		   })
          
	}


	onFail(errors){
     
		this.errors.record(errors);
	}

	onSuccess(data){
		alert(data.message);
		
		this.reset();
	}
}


new Vue({

   el:'#app',

   data:{
	   	form:new Form({
	   		email:"",
	   		password:""
	   	}),

   },



   methods:{
   	onSubmit(){
   		this.form.post('/testpost')
   		.then(data=>alert('handing it'))
   		.catch(errors=>{
   			
   		});
     // axios.post('/testpost',this.$data.form).then(this.onSuccess)
     // .catch(error=>this.form.errors.record(error.response.data));

   	},
   	onSuccess(response){
   		alert(response.data.message);
   		form.reset();
   	}
   }
})