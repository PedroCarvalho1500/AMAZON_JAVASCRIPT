import { Product,Clothing,Appliance } from '../../../data/products.js'

describe('Test Product class', () => {
    it('Product can be created with valid values and methods work properly', () => {
        const testProduct = new Product({
            id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
            image: "images/products/men-golf-polo-t-shirt-blue.jpg",
            name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
            rating: {
                stars: 4.5,
                count: 2556
            },
            priceCents: 1599,
            keywords: [
                "tshirts",
                "shirts",
                "apparel",
                "mens"
            ],
            type: "product"
        });
        const isInstanceOfProduct = testProduct instanceof Product;
        const testProductId = testProduct.id;
        const starsUrl = testProduct.getStarsUrl();
        const testPrice = testProduct.getPrice();

        expect(isInstanceOfProduct).toEqual(true);
        expect(testProductId).toEqual(`8b5a2ee1-6055-422a-a666-b34ba28b76d4`);
        expect(starsUrl).toEqual(`images/ratings/rating-4.5.png`);
        expect(testPrice).toEqual(`$15.99`);
        expect(testProduct.extraInfoHtml()).toEqual(``);
    })
});


describe('Test Clothes class', () => {
    it('Cloth can be created with valid values and methods work properly', () => {
        const testCloth = new Clothing({
            id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
            image: "images/products/men-golf-polo-t-shirt-blue.jpg",
            name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
            rating: {
              stars: 4.5,
              count: 2556
            },
            priceCents: 1599,
            keywords: [
              "tshirts",
              "shirts",
              "apparel",
              "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
        const isInstanceOfProduct = testCloth instanceof Clothing;
        const testClothId = testCloth.id;
        const starsUrl = testCloth.getStarsUrl();
        const testPrice = testCloth.getPrice();

        expect(isInstanceOfProduct).toEqual(true);
        expect(testClothId).toEqual(`8b5a2ee1-6055-422a-a666-b34ba28b76d4`);
        expect(starsUrl).toEqual(`images/ratings/rating-4.5.png`);
        expect(testPrice).toEqual(`$15.99`);
        expect(testCloth.extraInfoHtml()).toEqual(`<a href="${testCloth.sizeChartLink}" target="_blank">Size chart</a>`);
    })
});

describe('Test Appliance class', () => {
    it('Appliance can be created with valid values and methods work properly', () => {
        const testAppliance = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
              stars: 5,
              count: 2197
            },
            priceCents: 1899,
            keywords: [
              "toaster",
              "kitchen",
              "appliances"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        });
        const isInstanceOfProduct = testAppliance instanceof Appliance;
        const testApplianceId = testAppliance.id;
        const starsUrl = testAppliance.getStarsUrl();
        const testPrice = testAppliance.getPrice();

        expect(isInstanceOfProduct).toEqual(true);
        expect(testApplianceId).toEqual(`54e0eccd-8f36-462b-b68a-8182611d9add`);
        expect(starsUrl).toEqual(`images/ratings/rating-5.png`);
        expect(testPrice).toEqual(`$18.99`);
        expect(testAppliance.extraInfoHtml()).toEqual(`<a href="${testAppliance.instructionsLink}" target="_blank">Instructions</a>\n<a href="${testAppliance.warrantyLink}" target="_blank">Warranty</a>`);
    })
});