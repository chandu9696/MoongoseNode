class ApiFeatures{
    querystring: any;
    query: any;

    constructor(query:any,queryString:any)
    {
        this.query=query;
        this.querystring=queryString
        console.log('callled')
        // Error.captureStackTrace(this,this.constructor)
    }
    search()
    {
        const keyword=this.querystring.keyword?
        {
            name:{
                $regex:this.querystring.keyword,
                $options:'i'
            }
        }
        :{};
        console.log(keyword)
        this.query=this.query.find({...keyword})
        return this;
    }
    filter()
    {
        const copystr={...this.querystring}
        const removefields=['keyword','limit','page']
        removefields.forEach((key)=>delete copystr[key])

        let queryStr = JSON.stringify(copystr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
        console.log(queryStr)
        return this;
  
    }
    pagination(resultPerPage:any) {
        const currentPage = Number(this.querystring.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
}

module.exports=ApiFeatures
