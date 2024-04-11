import { Product } from "../models/product.model.js";
import { apierror } from "../utils/apierror.js";
import { Apifeatures } from "../utils/apifeature.js";
import { apiresponse } from '../utils/apiresponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
// create product::
//admin route:
const createproduct = asyncHandler(async (req, res, next) => {
    req.body.user = req.user._id;
    console.log(req.body);
    try {
        const product = await Product.create(req.body);
    //    console.log(product);
    return res.status(200).json(new apiresponse(200, product, "product have been created successfully"));
    } catch (error) {
        return res.status(501).json({message:`${error}`,ok:false});  
    }
    
})
const getallproduct = asyncHandler(async (req, res, next) => {
    // search feature implemented
    
    try {
        const resultperpage = 5;
    const productcount = await Product.countDocuments();
    
    const apifeature = new Apifeatures( Product.find(), req.query).search().filter().pagination(resultperpage);
    const allproduct = await apifeature.query;
   
    res.status(200).json(new apiresponse(200, allproduct, productcount, "data have beeen fetched successfully"));
    } catch (error) {
        console.log(`error occured in ${error.message}`);
        return res.status(404).json("error bawa")
    }
})
//admin route:
const updateproduct = asyncHandler(async (req, res, next) => {
    //console.log(req.params.id);
    let product = await Product.findById(req.params.id);
    // console.log(product);
    // console.log(req.body);
    if (!product) {
        return next(new apierror(404, "product have not been updated"))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(new apiresponse(200, product, "data have been updated successfully"))
})
const deleteproduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    console.log(product);
    if (!product)
        return next(new apierror(404, "product does not deleted"))
    await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json(new apiresponse(200, "product have been deleted"));
})
const productdetails = async (req, res, next) => {
    try {
        // Using async/await to handle asynchronous operations
        const product = await Product.findById(req.params.id);

        // Checking if the product with the specified ID exists
        if (!product) {
            // If the product is not found, return a 404 error with a JSON response
            return res.status(404).json(new apierror(404, "Product not found"));
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {

        return next(new apierror(404, "product not found"))
    }
}
const productReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productid } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: rating,
        comment,

    }
    const product = await Product.findById(productid);

    const isreviewwd = product.reviews.find(rev => rev.user === req.user._id);

    if (isreviewwd) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        });
    }
    else {

        product.reviews.push(review);
        product.numofdreview = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg = avg + rev.rating;
    })
    product.rating = avg / product.reviews.length

    await product.save({ valdiateBeforeSave: false });
    return res.status(200).json(new apiresponse(200, product, "review have been submitted successfully"));
})
const findallreviews = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        next(new apierror(404, "product with that id is not found"));

    }
    res.status(200).json(new apiresponse(200, product.reviews, "all the reviews are fetched"));
})
const deletereview = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productid);
    if (!product) {
        next(new apierror(404, "product with that id is not found"));
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    let avg = 0;

    reviews.forEach(rev => {
        avg = avg + rev.rating;
    })
    const rating = avg / reviews.length;
    const numofdreview = reviews.length;
    let newproduct = await Product.findByIdAndUpdate(req.query.productid,
        {
            $set: {
                reviews, rating, numofdreview
            }
        },
        {
            new: true
        }
    )

    res.status(200).json(new apiresponse(200, newproduct.reviews, " the reviews have been deleted"));
})


export {
    getallproduct, createproduct,
    updateproduct,
    deleteproduct,
    productdetails, productReview,
    findallreviews, deletereview
}