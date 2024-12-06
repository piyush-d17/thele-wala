const cateModel=require('../models/category.model.js')
const userModel=require('../models/user.model.js');

const addCategory = async (req, res) => {
    try {
      const categories = [
        {
          name: 'Beverages',
          subcategories: ['Water', 'Juice', 'Tea', 'Coffee', 'Milkshakes', 'Smoothies', 'Soda', 'Energy Drinks'],
        },
        {
          name: 'Healthy',
          subcategories: ['Vegetables', 'Fruit', 'Plant', 'Salads', 'Herbs', 'Whole Grains', 'Nuts', 'Legumes'],
        },
        {
          name: 'Desserts',
          subcategories: ['Ice Cream', 'Cake', 'Brownies', 'Cookies', 'Pastries', 'Pudding', 'Muffins', 'Donuts'],
        },
        {
          name: 'Miscellaneous',
          subcategories: ['Rag Picker', 'Potter', 'Bedsheets', 'Others', 'Toys', 'Utensils', 'Decor', 'Stationery'],
        },
        {
          name: 'Snacks',
          subcategories: ['Snacks', 'Chips', 'Popcorn', 'Biscuits', 'Crackers', 'Trail Mix', 'Pretzels', 'Granola Bars'],
        },
      ];
  
      // Insert multiple categories into the database
      await cateModel.create(categories);
  
      return res.status(200).json({ message: 'Categories added successfully!' });
    } catch (error) {
      console.error('Error adding categories:', error);
      return res.status(500).json({ error: 'Failed to add categories.', details: error.message });
    }
  };

const viewCategory=async(req,res)=>{
    try {
        const allCate=await cateModel.find({});
        return res.status(200).json({allcate:allCate});
    } catch (error) {
        return res.status(500).json({error:error});
    }
}
const searchCategory = async (req, res) => {
    try {
      const { name, subcategories } = req.query;
      if (!name && !subcategories) {
        return res.status(400).json({ error: 'At least one query parameter (name or subcategories) is required.' });
      }
      const searchQuery = {};
      if (name) {
        searchQuery.name = { $regex: name, $options: 'i' }; // Case-insensitive match for category name
      }
      if (subcategories) {
        searchQuery.subcategories = { $regex: subcategories, $options: 'i' }; // Case-insensitive match for subcategories
      }
      const srch=(searchQuery.name.$regex);
        const sellersWithLocations = await userModel.aggregate([
            {
                $match: { role: 'seller',category:srch }  // Match only users with the role 'seller'
            },
            {
                $lookup: {
                    from: 'locations',  // Name of the Location collection (lowercase 'locations')
                    localField: '_id',  // The _id of User (this will be compared with the user field in Location)
                    foreignField: 'user',  // The user field in Location model
                    as: 'location'  // The alias name for the populated location data
                }
            },
            {
                $unwind: {
                    path: '$location',  // Unwind the location array to flatten it
                    preserveNullAndEmptyArrays: true  // In case there is no location associated with the user
                }
            }
        ]);
      
      return res.status(200).json({ sellersWithLocations });
    } catch (error) {
      console.error('Error searching categories:', error);
      return res.status(500).json({ error: 'Failed to search categories.', details: error.message });
    }
  };
  

module.exports={addCategory,viewCategory,searchCategory}