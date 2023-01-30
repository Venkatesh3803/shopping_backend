import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()
const stripe = Stripe(process.env.STRIPE_KEY)

export const checkOut = async (req, res) => {

    const line_items = req.body.cartData.map((c) => {
        return {
            price_data: {
                currency: "INR",
                product_data: {
                    name: c.postData.title,
                    images: [c.postData.image[0].url],
                    metadata: {
                        id: c.postData.id
                    }
                },
                unit_amount: c.postData.price * 100
            },
            quantity: c.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: { allowed_countries: ['IN'] },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 6500, currency: 'INR' },
                    display_name: 'shipping charges',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 5 },
                        maximum: { unit: 'business_day', value: 7 },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true
        },
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/sucesspage`,
        cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.send({ url: session.url });
};
