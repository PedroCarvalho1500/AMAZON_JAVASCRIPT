import {formatCurrency} from "../../scripts/utils/money.js";

describe('Test formatCurrency function', function() {
    it('Should convert cents into dolars', () => {
      expect(formatCurrency(2095)).toEqual("20.95");
    });

    it("Should round the number within the cents", () => {
      expect(formatCurrency(20054)).toEqual("200.54"); 
    });

    it("Works with 0", () => {
      expect(formatCurrency(0)).toEqual("0.00");
    })

    it("Rounds up to the nearest cent", () => {
      expect(formatCurrency(2000.5)).toEqual('20.01');
    })

})