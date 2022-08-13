

module.exports = (theFunc:any):any => (req:any, res:any, next:any) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };