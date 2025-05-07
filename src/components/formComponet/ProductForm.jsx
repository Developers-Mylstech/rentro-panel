// ProductForm.js
import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { FaSpinner } from 'react-icons/fa';
import useProductStore from '../../Context/ProductContext';
import ProductBasicInfo from './ProductBasicInfo';
import CategoryBrandSelection from './CategoryBrandSelection';
import PricingOptions from './PricingOptions';
import SpecificationFields from './SpecificationFields';
import InventorySection from './InventorySection';
import KeyFeaturesFields from './KeyFeaturesFields';
import TagsAndKeywords from './TagsAndKeywords';
import ImageUploader from './ImageUploader';
import SpecificationFields2 from './SpecificationFields2';

const ProductForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const toast = useRef(null);
  const { createProduct, getProductsById, singleProduct, updateProduct } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const navigate = useNavigate()
  const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      basicInfo: {
        name: '',
        shortDescription: '',
        longDescription: '',
        manufacturer: '',
        supplierName: '',
        supplierCode: '',
        modelNo: '',
      },
      category: {
        main: null,
        sub: null
      },
      brand: null,
      pricing: {
        sell: {
          price: '',
          discountPrice: '',
          discountUnit: '',
          discountValue: '',
          benefits: [''],
          vat: 0,
          warrantPeriod: 1
        },
        rent: {
          monthlyPrice: '',
          discount: '',
          discountedPrice: '',
          benefits: [''],
          vatIncluded: true,
        },
        services: {
          ots: { price: '', benefits: [''] },
          mmc: { price: '', benefits: [''] },
          amcBasic: { price: '', benefits: [''] },
          amcGold: { price: '', benefits: [''] }
        }
      },
      inventory: {
        sku: '',
        quantity: 1,
        stockStatus: 'IN_STOCK'
      },
      keyFeatures: [''],
      specifications: [{ name: '', value: '' }],
      images: [],
      tagandkeywords: ['']
    }
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (location.pathname === '/products/add') {

        reset({
          basicInfo: {
            name: '',
            shortDescription: '',
            longDescription: '',
            manufacturer: '',
            supplierName: '',
            supplierCode: '',
            modelNo: '',
          },
          category: {
            main: null,
            sub: null
          },
          brand: null,
          pricing: {
            sell: {
              actualPrice: 0,
              discountValue: 0,
              discountUnit: '',
              discountedPrice: 0,
              isVatIncluded: false,
              benefits: [],
              warrantPeriod: 0,
              vat: 0
            },
            rent: {
              monthlyPrice: 0,
              discountValue: 0,
              discountUnit: '',
              discountedPrice: 0,
              isVatIncluded: false,
              benefits: []
            },
            services: {
              ots: {
                price: '',
                benefits: []
              },
              mmc: {
                price: '',
                benefits: []
              },
              amcBasic: {
                price: '',
                benefits: []
              },
              amcGold: {
                price: '',
                benefits: []
              }
            }
          },
          inventory: {
            sku: '',
            quantity: 1,
            stockStatus: 'IN_STOCK'
          },
          keyFeatures: [''],
          specifications: [{ name: '', value: '' }],
          images: [],
          tagandkeywords: ['']
        });
        setPageLoading(false);
      } else if (id) {

        setPageLoading(true);
        const res = await getProductsById(id);

        if (res?.name) {
          reset({
            basicInfo: {
              name: res.name || '',
              shortDescription: res.description || '',
              longDescription: res.longDescription || '',
              manufacturer: res.manufacturer || '',
              supplierName: res.supplierName || '',
              supplierCode: res.supplierCode || '',
              modelNo: res.modelNo || '',
            },
            category: {
              main: res.category?.name || null,
              sub: res.category?.sub || null
            },
            brand: res.brand || null,
            pricing: {
              sell: res.pricing?.sell || null,
              rent: res.pricing?.rent || null,
              services: {
                ots: res.pricing?.services?.ots || null,
                mmc: res.pricing?.services?.mmc || null,
                amcBasic: res.pricing?.services?.amcBasic || null,
                amcGold: res.pricing?.services?.amcGold || null
              }
            },
            inventory: {
              sku: res.inventory?.sku || '',
              quantity: res.inventory?.quantity || 1,
              stockStatus: res.inventory?.stockStatus || 'IN_STOCK'
            },
            keyFeatures: res.keyFeatures || [''],
            specifications: res.specifications || [{ name: '', value: '' }],
            images: res.imageUrls || [],
            tagandkeywords: res.tagNKeywords || ['']
          });
        }
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [location.pathname, id, reset, getProductsById]);

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000
    });
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (data?.images?.length === 0 && !isImageSelected) {
      showToast('warn', 'Warning', 'Please select an image.');
      return;
    }
    if (data?.images?.length === 0 && isImageSelected) {
      showToast('warn', 'Warning', 'Please Upload Image first.');
      return;
    }


    if (!data?.category?.main) {
      showToast('warn', 'Warning', 'Please select a Category.');
      return;
    }

    if (!data?.brand) {
      showToast('warn', 'Warning', 'Please select a Brand.');
      return;
    }

    if (!isImageUpload && singleProduct?.imageUrls?.length === 0) {
      showToast('warn', 'Warning', 'Please Upload Image First');
      return;
    }

    try {
      setLoading(true);
      const payload = preparePayload(data);

      let response;
      if (id) {
        console.log(payload,'preparePayload')
        response = await updateProduct(id, payload);
        if (response?.status == 200) {
          navigate('/products')
        }
        showToast('success', 'Success', 'Product updated successfully!');
      } else {

        response = await createProduct(payload);
        showToast('success', 'Success', 'Product created successfully!');
        if (response?.status == 200 || response?.status == 201) {
          reset({
            ...data,
            category: {
              ...data.category,
              main: null,
              sub: null
            }
          });
          
//           setTimeout(() => {
// navigate('/products')
//           }, 500);
        }


      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast('error', 'Error', 'Failed to create product. Please try again.');
      console.error('Error creating product:', error);
    }
  };

  const preparePayload = (data) => {
  
    const imageUrls = Array.isArray(data.images)
      ? data.images
        .map(img => typeof img === 'string' ? img : img?.url?.fileUrl || '')
        .filter(url => url)
      : [];

    const specifications = Array.isArray(data.specifications)
      ? data.specifications
        .filter(spec => spec?.name && spec?.value)
        .map(spec => ({ name: spec.name, value: spec.value }))
      : [];

    const getServicePayload = (service) => {
      if (!service) return { price: 0, benefits: [] };

      return {
        price: Number(service.price) || 0,
        benefits: Array.isArray(service.benefits)
          ? service.benefits.filter(benefit => benefit && benefit.trim() !== '')
          : (service.benefits ? [service.benefits].filter(b => b && b.trim() !== '') : [])
      };
    };

    const productFor = {
      service: {
        ots: getServicePayload(data.pricing?.services?.ots),
        mmc: getServicePayload(data.pricing?.services?.mmc),
        amcBasic: getServicePayload(data.pricing?.services?.amcBasic),
        amcGold: getServicePayload(data.pricing?.services?.amcGold)
      }
    };

    if (data.pricing?.sell?.actualPrice) {
      productFor.sell = {
        actualPrice: data.pricing.sell.actualPrice,
        discountValue: data.pricing.sell.discountValue || 0,
        discountUnit: data.pricing.sell.discountUnit || 'PERCENTAGE',
        discountPrice: data.pricing.sell.discountedPrice || 0,
        isVatIncluded: data.pricing.sell.isVatIncluded || false,
        benefits: Array.isArray(data.pricing.sell.benefits)
          ? data.pricing.sell.benefits.filter(b => b)
          : [],
        warrantPeriod: +(data.pricing.sell.warrantPeriod || 0)
      };
    }

    if (data.pricing?.rent?.monthlyPrice) {
      productFor.rent = {
        monthlyPrice: data.pricing.rent.monthlyPrice,
        discountPrice: data.pricing.rent.discountedPrice || 0,
        discountValue: data.pricing.rent.discountValue || 0,
        discountUnit: data.pricing.rent.discountUnit || 'PERCENTAGE',
        isVatIncluded: data.pricing.rent.isVatIncluded || false,
        benefits: Array.isArray(data.pricing.rent.benefits)
          ? data.pricing.rent.benefits.filter(b => b)
          : [],
      };
    }

    return {
      name: data.basicInfo.name || '',
      description: data.basicInfo.shortDescription || '',
      longDescription: data.basicInfo.longDescription || '',
      manufacturer: data.basicInfo.manufacturer || '',
      brandId: +(data?.brand?.brandId || 0),
      imageUrls,
      specifications,
      modelNo: data.basicInfo.modelNo || '',
      supplierName: data.basicInfo.supplierName || '',
      supplierCode: data.basicInfo.supplierCode || '',
      productFor,
      categoryId: data.category?.main,
      subCategoryId: data?.category?.sub,
      inventory: {
        quantity: +(data.inventory?.quantity),
        sku: data.inventory?.sku || '',
        stockStatus: data.inventory?.stockStatus || 'IN_STOCK'
      },
      keyFeatures: Array.isArray(data.keyFeatures)
        ? data.keyFeatures.filter(f => f)
        : [],
      tagNKeywords: Array.isArray(data?.tagandkeywords)
        ? data.tagandkeywords.filter(t => t)
        : []
    };
  };


  return (
    <div className="mx-auto px-0 py-0">
      <Toast ref={toast} position="top-right" />

      <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-b dark:border-gray-600 pb-2">
          {id ? 'Edit Product' : 'Add New Product'}
        </h1>

        {pageLoading ? (
          <div className='flex justify-center items-center h-96'>
            <FaSpinner className='animate-spin' />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-gray-700 dark:text-gray-300">
            <ProductBasicInfo control={control} errors={errors} />
            <CategoryBrandSelection control={control} errors={errors} singleProduct={singleProduct} setValue={setValue} />
            <PricingOptions control={control} watch={watch} setValue={setValue} singleProduct={singleProduct} />
            <SpecificationFields2 control={control} watch={watch} setValue={setValue} />
            <InventorySection control={control} />
            <KeyFeaturesFields control={control} watch={watch} setValue={setValue} />
            <TagsAndKeywords control={control} watch={watch} setValue={setValue} />
            <ImageUploader
              control={control}
              setValue={setValue}
              watch={watch}
              singleProduct={singleProduct}
              setIsImageSelected={setIsImageSelected}
              setIsImageUpload={setIsImageUpload}
            />

            <div className="flex justify-end pt-4 border-t dark:border-gray-600">
              <button
                type="submit"
                className="px-6 py-2 bg-secondary text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                disabled={loading}
              >
                {loading ? <FaSpinner className='animate-spin' /> : id ? 'Update Product' : 'Add New Product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductForm;