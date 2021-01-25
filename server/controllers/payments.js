const stripe = require("stripe")("sk_test_51IDaPbEcQoHsXCCF6WcdCXGqsulPALNrwxyUASMMpKmtVdB510T5VYkqpIV8nSkBsKFBZA75ePFE8UR49XmQviWr00ChwSF0Ce");

module.exports = {
  
  async createOrRetrieveCustomer(req, res) {
    try {
      const existingCustomer = await stripe.customers.list({email:req.body.email});
      if (existingCustomer.data.length) {
          return res.status(200).send({customerStripeId:existingCustomer.data[0].id});
      }    
      else {
      const customer = await stripe.customers.create({
          source:req.body.token,
          description:"Customer for our book store",
          email:req.body.email
      });
      return res.status(200).send({customerStripeId:customer.id});

      }
    } catch(err) {
        return res.status(400).send(err);
    }    
  },

  async create(req, res) {
    try
    {
      const charge = await stripe.charges.create({
          amount:req.body.amount,
          currency:'eur',
          customer:req.body.customerStripeId
      },{
          idempotency_key:req.body.idemKey
      });
      return res.status(200).send(charge);
     
    } catch(err) {
        return res.status(400).send(err);
  }},
  
  list(req, res) {
  stripe.charges.list(
    { limit: 3 },
    function(err, ) {
      if (err) {
          return res.status(400).send(err)
      }
      return res.status(200).send(charges)
    }
    );
  },
  
  listCustomers(req, res) {
    stripe.customers.list(
      { limit: 3 },
      function(err, customers) {
        if (err) {
          return res.status(400).send(err)
      }
      return res.status(200).send(customers)
      }
    );
  }

}