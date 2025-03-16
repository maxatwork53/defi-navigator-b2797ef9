
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const MakeAWish = () => {
  // Function to handle the Make a Wish button click
  const handleMakeWish = () => {
    // Open Google survey in a new tab
    window.open('https://forms.gle/your-google-form-url', '_blank');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10">
        <Card className="border-2 border-primary/20 dark:border-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center gap-2">
              <Heart className="text-primary w-8 h-8" />
              Make A Wish
              <Heart className="text-primary w-8 h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-lg">
              We're constantly improving DeFi Navigator to serve you better. 
              Is there a feature you wish we had? A tool that would make your DeFi journey smoother?
            </p>
            
            <p className="text-lg">
              This is your chance to shape the future of DeFi Navigator. No wish is too big or too small.
              Our team reviews every suggestion and works hard to make your wishes come true.
            </p>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                onClick={handleMakeWish}
                className="px-8 py-6 text-lg gap-2"
              >
                <Star className="w-5 h-5" />
                Make a Wish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MakeAWish;
