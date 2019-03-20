"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mongoose = require("mongoose");
var user_1 = require("./models/user");
var car_1 = require("./models/car");
var person_1 = require("./models/person");
var rating_1 = require("./models/rating");
var nested_object_1 = require("./models/nested-object");
var genders_1 = require("./enums/genders");
var role_1 = require("./enums/role");
var mongoConnect_1 = require("./utils/mongoConnect");
var utils_1 = require("../utils");
var assert_1 = require("assert");
describe('Typegoose', function () {
    before(function () { return mongoConnect_1.initDatabase(); });
    after(function () { return mongoConnect_1.closeDatabase(); });
    it('should create a User with connections', function () { return __awaiter(_this, void 0, void 0, function () {
        var car, _a, trabant, zastava, user, foundUser, _b, janitor, manager, _c, foundTrabant, foundZastava, foundUser, createdUser, foundUser, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, car_1.model.create({
                        m: 'Tesla',
                        version: 'ModelS',
                        price: mongoose.Types.Decimal128.fromString('50123.25'),
                    })];
                case 1:
                    car = _d.sent();
                    return [4 /*yield*/, car_1.model.create([{
                                model: 'Trabant',
                                price: mongoose.Types.Decimal128.fromString('28189.25'),
                            }, {
                                model: 'Zastava',
                                price: mongoose.Types.Decimal128.fromString('1234.25'),
                            }])];
                case 2:
                    _a = _d.sent(), trabant = _a[0], zastava = _a[1];
                    return [4 /*yield*/, user_1.model.create({
                            _id: mongoose.Types.ObjectId(),
                            firstName: 'John',
                            lastName: 'Doe',
                            age: 20,
                            uniqueId: 'john-doe-20',
                            gender: genders_1.Genders.MALE,
                            role: role_1.Role.User,
                            job: {
                                title: 'Developer',
                                position: 'Lead',
                                jobType: {
                                    salery: 5000,
                                    field: "IT",
                                },
                            },
                            car: car.id,
                            languages: ['english', 'typescript'],
                            previousJobs: [{
                                    title: 'Janitor',
                                }, {
                                    title: 'Manager',
                                }],
                            previousCars: [trabant.id, zastava.id],
                        })];
                case 3:
                    user = _d.sent();
                    return [4 /*yield*/, user_1.model
                            .findById(user.id)
                            .populate('car previousCars')
                            .exec()];
                case 4:
                    foundUser = _d.sent();
                    chai_1.expect(foundUser).to.have.property('nick', 'Nothing');
                    chai_1.expect(foundUser).to.have.property('firstName', 'John');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Doe');
                    chai_1.expect(foundUser).to.have.property('uniqueId', 'john-doe-20');
                    chai_1.expect(foundUser).to.have.property('age', 20);
                    chai_1.expect(foundUser).to.have.property('gender', genders_1.Genders.MALE);
                    chai_1.expect(foundUser).to.have.property('role', role_1.Role.User);
                    chai_1.expect(foundUser).to.have.property('roles').to.have.length(1).to.include(role_1.Role.Guest);
                    chai_1.expect(foundUser).to.have.property('job');
                    chai_1.expect(foundUser).to.have.property('car');
                    chai_1.expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
                    chai_1.expect(foundUser.job).to.have.property('title', 'Developer');
                    chai_1.expect(foundUser.job).to.have.property('position', 'Lead');
                    chai_1.expect(foundUser.job).to.have.property('startedAt').to.be.instanceof(Date);
                    chai_1.expect(foundUser.job.jobType).to.not.have.property('_id');
                    chai_1.expect(foundUser.job.titleInUppercase()).to.eq("Developer".toUpperCase());
                    chai_1.expect(foundUser.job.jobType).to.have.property('salery', 5000);
                    chai_1.expect(foundUser.job.jobType).to.have.property('field', 'IT');
                    chai_1.expect(foundUser.job.jobType).to.have.property('salery').to.be.a('number');
                    chai_1.expect(foundUser.car).to.have.property('model', 'Tesla');
                    chai_1.expect(foundUser.car).to.have.property('version', 'models');
                    chai_1.expect(foundUser).to.have.property('previousJobs').to.have.length(2);
                    chai_1.expect(foundUser).to.have.property('fullName', 'John Doe');
                    _b = foundUser.previousJobs, janitor = _b[0], manager = _b[1];
                    chai_1.expect(janitor).to.have.property('title', 'Janitor');
                    chai_1.expect(manager).to.have.property('title', 'Manager');
                    chai_1.expect(foundUser).to.have.property('previousCars').to.have.length(2);
                    _c = foundUser.previousCars, foundTrabant = _c[0], foundZastava = _c[1];
                    chai_1.expect(foundTrabant).to.have.property('model', 'Trabant');
                    chai_1.expect(foundTrabant).to.have.property('isSedan', true);
                    chai_1.expect(foundZastava).to.have.property('model', 'Zastava');
                    chai_1.expect(foundZastava).to.have.property('isSedan', undefined);
                    foundUser.fullName = 'Sherlock Holmes';
                    chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
                    return [4 /*yield*/, foundUser.incrementAge()];
                case 5:
                    _d.sent();
                    chai_1.expect(foundUser).to.have.property('age', 21);
                    return [4 /*yield*/, user_1.model.findByAge(21)];
                case 6:
                    foundUser = _d.sent();
                    chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
                    chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
                    return [4 /*yield*/, user_1.model.findOrCreate({
                            firstName: 'Jane',
                            lastName: 'Doe',
                            gender: genders_1.Genders.FEMALE,
                        })];
                case 7:
                    createdUser = _d.sent();
                    chai_1.expect(createdUser).to.be.ok;
                    chai_1.expect(createdUser).to.have.property('created');
                    chai_1.expect(createdUser.created).to.be.true;
                    chai_1.expect(createdUser).to.have.property('doc');
                    chai_1.expect(createdUser.doc).to.have.property('firstName', 'Jane');
                    return [4 /*yield*/, user_1.model.findOrCreate({
                            firstName: 'Jane',
                            lastName: 'Doe',
                        })];
                case 8:
                    foundUser = _d.sent();
                    chai_1.expect(foundUser).to.be.ok;
                    chai_1.expect(foundUser).to.have.property('created');
                    chai_1.expect(foundUser.created).to.be.false;
                    chai_1.expect(foundUser).to.have.property('doc');
                    chai_1.expect(foundUser.doc).to.have.property('firstName', 'Jane');
                    _d.label = 9;
                case 9:
                    _d.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, user_1.model.create({
                            _id: mongoose.Types.ObjectId(),
                            firstName: 'John',
                            lastName: 'Doe',
                            age: 20,
                            gender: genders_1.Genders.MALE,
                            uniqueId: 'john-doe-20',
                        })];
                case 10:
                    _d.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_1 = _d.sent();
                    chai_1.expect(err_1).to.have.property('code', 11000);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); });
    it('should add a language and job using instance methods', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, savedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.model.create({
                        firstName: 'harry',
                        lastName: 'potter',
                        gender: genders_1.Genders.MALE,
                        languages: ['english'],
                        uniqueId: 'unique-id',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user.addJob({ position: 'Dark Wizzard', title: 'Archmage' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.addJob()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.addLanguage()];
                case 4:
                    savedUser = _a.sent();
                    chai_1.expect(savedUser.languages).to.include('Hungarian');
                    chai_1.expect(savedUser.previousJobs.length).to.be.above(0);
                    savedUser.previousJobs.map(function (prevJob) {
                        chai_1.expect(prevJob.startedAt).to.be.ok;
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add compound index', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, car, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.model.findOne()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, car_1.model.findOne()];
                case 2:
                    car = _a.sent();
                    return [4 /*yield*/, rating_1.model.create({ user: user._id, car: car._id, stars: 4 })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, rating_1.model.create({ user: user._id, car: car._id, stars: 5 })
                            .then(function () { return true; }).catch(function () { return false; })];
                case 4:
                    created = _a.sent();
                    chai_1.expect(created).to.be.false;
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getClassForDocument()', function () {
    before(function () { return mongoConnect_1.initDatabase(); });
    it('should return correct class type for document', function () { return __awaiter(_this, void 0, void 0, function () {
        var car, carReflectedType, user, userReflectedType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, car_1.model.create({
                        model: 'Tesla',
                        price: mongoose.Types.Decimal128.fromString('50123.25'),
                    })];
                case 1:
                    car = _a.sent();
                    carReflectedType = utils_1.getClassForDocument(car);
                    chai_1.expect(carReflectedType).to.equals(car_1.Car);
                    return [4 /*yield*/, user_1.model.create({
                            _id: mongoose.Types.ObjectId(),
                            firstName: 'John2',
                            lastName: 'Doe2',
                            gender: genders_1.Genders.MALE,
                            languages: ['english2', 'typescript2'],
                        })];
                case 2:
                    user = _a.sent();
                    userReflectedType = utils_1.getClassForDocument(user);
                    chai_1.expect(userReflectedType).to.equals(user_1.User);
                    // assert negative to be sure (false positive)
                    chai_1.expect(carReflectedType).to.not.equals(user_1.User);
                    chai_1.expect(userReflectedType).to.not.equals(car_1.Car);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should use inherited schema', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, car;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, person_1.model.create({
                        email: 'my@email.com',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, car_1.model.create({
                            model: 'Tesla',
                            price: mongoose.Types.Decimal128.fromString('50123.25'),
                        })];
                case 2:
                    car = _a.sent();
                    return [4 /*yield*/, user.addCar(car)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, person_1.model.findById(user.id).populate('cars')];
                case 4:
                    user = _a.sent();
                    // verify properties
                    chai_1.expect(user).to.have.property('createdAt');
                    chai_1.expect(user).to.have.property('email', 'my@email.com');
                    chai_1.expect(user.cars.length).to.be.above(0);
                    user.cars.map(function (currentCar) {
                        chai_1.expect(currentCar.m).to.be.ok;
                    });
                    // verify methods
                    chai_1.expect(user.getClassName()).to.equals('Person');
                    chai_1.expect(person_1.model.getStaticName()).to.equals('Person');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should store nested address', function () { return __awaiter(_this, void 0, void 0, function () {
        var personInput, person;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    personInput = new nested_object_1.PersonNested();
                    personInput.name = 'Person, Some';
                    personInput.address = new nested_object_1.AddressNested('A Street 1');
                    personInput.moreAddresses = [
                        new nested_object_1.AddressNested('A Street 2'),
                        new nested_object_1.AddressNested('A Street 3'),
                    ];
                    return [4 /*yield*/, nested_object_1.PersonNestedModel.create(personInput)];
                case 1:
                    person = _a.sent();
                    chai_1.expect(person).is.not.undefined;
                    chai_1.expect(person.name).equals('Person, Some');
                    chai_1.expect(person.address).is.not.undefined;
                    chai_1.expect(person.address.street).equals('A Street 1');
                    chai_1.expect(person.moreAddresses).is.not.undefined;
                    chai_1.expect(person.moreAddresses.length).equals(2);
                    chai_1.expect(person.moreAddresses[0].street).equals('A Street 2');
                    chai_1.expect(person.moreAddresses[1].street).equals('A Street 3');
                    return [2 /*return*/];
            }
        });
    }); });
    // faild validation will need to be checked
    it('Should validate Decimal128', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, car, foundCar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, car_1.model.create({
                            model: 'Tesla',
                            price: 'NO DECIMAL',
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    chai_1.expect(e_1).to.be.a.instanceof(mongoose.Error.ValidationError);
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, car_1.model.create({
                        model: 'Tesla',
                        price: mongoose.Types.Decimal128.fromString('123.45'),
                    })];
                case 4:
                    car = _a.sent();
                    return [4 /*yield*/, car_1.model.findById(car._id).exec()];
                case 5:
                    foundCar = _a.sent();
                    chai_1.expect(foundCar.price).to.be.a.instanceof(mongoose.Types.Decimal128);
                    chai_1.expect(foundCar.price.toString()).to.eq('123.45');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should validate email', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, person_1.model.create({
                            email: 'email',
                        })];
                case 1:
                    _a.sent();
                    assert_1.fail('Validation must fail.');
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    chai_1.expect(e_2).to.be.a.instanceof(mongoose.Error.ValidationError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2luZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBMFNBOztBQTFTQSw2QkFBOEI7QUFDOUIsbUNBQXFDO0FBRXJDLHNDQUFnRTtBQUNoRSxvQ0FBNEQ7QUFDNUQsMENBQWtEO0FBQ2xELDBDQUFrRDtBQUNsRCx3REFBd0Y7QUFDeEYsMkNBQTBDO0FBQzFDLHFDQUFvQztBQUNwQyxxREFBbUU7QUFDbkUsa0NBQStDO0FBQy9DLGlDQUE4QjtBQUU5QixRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ3BCLE1BQU0sQ0FBQyxjQUFNLE9BQUEsMkJBQVksRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO0lBRTdCLEtBQUssQ0FBQyxjQUFNLE9BQUEsNEJBQWEsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBRTdCLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7Ozt3QkFDOUIscUJBQU0sV0FBRyxDQUFDLE1BQU0sQ0FBQzt3QkFDM0IsQ0FBQyxFQUFFLE9BQU87d0JBQ1YsT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3FCQUN4RCxDQUFDLEVBQUE7O29CQUpJLEdBQUcsR0FBRyxTQUlWO29CQUV5QixxQkFBTSxXQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzNDLEtBQUssRUFBRSxTQUFTO2dDQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzs2QkFDeEQsRUFBRTtnQ0FDRCxLQUFLLEVBQUUsU0FBUztnQ0FDZCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FB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