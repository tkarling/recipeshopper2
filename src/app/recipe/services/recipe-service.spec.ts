import '../../../test/test-helper.ts';

import {Repository} from '../../services/repository';
import {MockRepository} from '../../services/mock-repository';

import {RecipeModel} from './recipe-model';
import {RecipeService} from './recipe-service';
import {Observable} from 'rxjs';

let recipe1:RecipeModel = new RecipeModel("macaroni casserole");
let recipe2NS:RecipeModel = new RecipeModel("shephards pie");
let recipe3Del:RecipeModel = new RecipeModel("miso soup");
let recipe4Add:RecipeModel = new RecipeModel("corn muffins");
const recipes:RecipeModel[] = [recipe1, recipe2NS, recipe3Del];

const service:RecipeService = new RecipeService(new MockRepository(recipes));

describe('RecipeService Tests', () => {
    let noOfRecipes;

    function checkAmounts(noRecipes) {
        expect(service.recipes.length).toEqual(noRecipes);
    }

    beforeAll((done) => {
        service.refreshRecipes().then(() => {
                done();
        });
    });

    beforeEach(() => {
        noOfRecipes = service.recipes.length;
    });

    it('Should return recipes', (done) => {
        expect(service.recipes.length).toEqual(noOfRecipes);
        done();
    });

    it('Should add recipe', (done) => {
        service.addRecipe(recipe4Add).then(() => {
            checkAmounts(noOfRecipes + 1);
            done();
        });
    });

    it('Should delete recipe', (done) => {
        service.deleteRecipe(recipe3Del).then(() => {
            checkAmounts(noOfRecipes - 1);
            done();
        });
    });

    it('Should toggle onList', (done) => {
        function recipesNotOnList() {
            return service.recipes.filter((recipe) => {
                return ! recipe.onList;
            });
        }

        expect(recipesNotOnList().length).toEqual(0);
        service.toggleOnList(recipe1).then(() => {
            checkAmounts(noOfRecipes);
            expect(recipesNotOnList().length).toEqual(1);
            done();
        });
    });


});

