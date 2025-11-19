import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param, query } from 'express-validator';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Auth validation
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

export const validateRegister = [
  body('firstname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('First name must contain only letters'),
  body('lastname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Last name must contain only letters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['NORMALCLIENT', 'ADMINISTRATORCLIENT'])
    .withMessage('Role must be either NORMALCLIENT or ADMINISTRATORCLIENT'),
  handleValidationErrors
];

// Client validation
export const validateClientCreate = [
  body('firstname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['NORMALCLIENT', 'ADMINISTRATORCLIENT'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

export const validateClientUpdate = [
  body('firstname')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastname')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['NORMALCLIENT', 'ADMINISTRATORCLIENT'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

// Pharmacy validation
export const validatePharmacyCreate = [
  body('clientId')
    .isUUID()
    .withMessage('Valid client ID is required'),
  body('pharmacyName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Pharmacy name must be at least 2 characters long'),
  body('address')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters long'),
  body('city')
    .trim()
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters long'),
  body('country')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Country must be at least 2 characters long'),
  body('licenseNumber')
    .trim()
    .isLength({ min: 3 })
    .withMessage('License number must be at least 3 characters long'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  handleValidationErrors
];

export const validatePharmacyUpdate = [
  body('pharmacyName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Pharmacy name must be at least 2 characters long'),
  body('address')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters long'),
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters long'),
  body('country')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Country must be at least 2 characters long'),
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('License number must be at least 3 characters long'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  handleValidationErrors
];

// Product validation
export const validateProductCreate = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters long'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('dashboardId')
    .isUUID()
    .withMessage('Valid dashboard ID is required'),
  body('categoryId')
    .isUUID()
    .withMessage('Valid category ID is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  handleValidationErrors
];

export const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters long'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('categoryId')
    .optional()
    .isUUID()
    .withMessage('Valid category ID is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  handleValidationErrors
];

// Purchase validation
export const validatePurchaseCreate = [
  body('clientId')
    .isUUID()
    .withMessage('Valid client ID is required'),
  body('productId')
    .isUUID()
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  handleValidationErrors
];

export const validatePurchaseUpdate = [
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('total')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  handleValidationErrors
];

// Subscription validation
export const validateSubscriptionCreate = [
  body('clientId')
    .isUUID()
    .withMessage('Valid client ID is required'),
  body('packId')
    .isUUID()
    .withMessage('Valid pack ID is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'expired', 'cancelled'])
    .withMessage('Invalid status'),
  handleValidationErrors
];

export const validateSubscriptionUpdate = [
  body('packId')
    .optional()
    .isUUID()
    .withMessage('Valid pack ID is required'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'expired', 'cancelled'])
    .withMessage('Invalid status'),
  handleValidationErrors
];

// Pack validation
export const validatePackCreate = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Pack name must be at least 2 characters long'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('durationMonths')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 month'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Invalid status'),
  handleValidationErrors
];

export const validatePackUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Pack name must be at least 2 characters long'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('durationMonths')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 month'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Invalid status'),
  handleValidationErrors
];

// Dashboard validation
export const validateDashboardCreate = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Dashboard name must be at least 2 characters long'),
  body('packId')
    .isUUID()
    .withMessage('Valid pack ID is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  handleValidationErrors
];

export const validateDashboardUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Dashboard name must be at least 2 characters long'),
  body('packId')
    .optional()
    .isUUID()
    .withMessage('Valid pack ID is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  handleValidationErrors
];

// Page validation
export const validatePageCreate = [
  body('title')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long'),
  body('dashboardId')
    .isUUID()
    .withMessage('Valid dashboard ID is required'),
  body('content')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Content must be less than 5000 characters'),
  handleValidationErrors
];

export const validatePageUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long'),
  body('dashboardId')
    .optional()
    .isUUID()
    .withMessage('Valid dashboard ID is required'),
  body('content')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Content must be less than 5000 characters'),
  handleValidationErrors
];

// Category validation
export const validateCategoryCreate = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  handleValidationErrors
];

export const validateCategoryUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  handleValidationErrors
];

// ID validation
export const validateId = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format'),
  handleValidationErrors
];

// Query validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isString()
    .withMessage('SortBy must be a string'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('SortOrder must be either asc or desc'),
  handleValidationErrors
];