/* eslint-disable import/extensions */
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import SimpleInput from '../../components/input/SimpleInput';
import { fetchUsername } from '../../services/audits';

export const Profile = () => {
  const [role, setRole] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    newPassword?: string;
    confirmPassword?: string;
    currentPassword?: string;
  }>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchUsername()
      .then(user => {
        setRole(user.datas.role);
        setFormData({
          username: user.datas.username,
          firstname: user.datas.firstname,
          lastname: user.datas.lastname,
          email: user.datas.email ?? '',
          phone: user.datas.phone ?? '',
        });
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...formData,
        ...(formData.newPassword === '' && {
          newPassword: formData.newPassword,
        }),
        ...(formData.confirmPassword === '' && {
          confirmPassword: formData.confirmPassword,
        }),
        ...(formData.currentPassword === '' && {
          currentPassword: formData.currentPassword,
        }),
      }),
    })
      .then(res => {
        if (res.ok) {
          toast.success('User updated successfully');
        } else {
          toast.error('Error updating user');
        }
      })
      .catch(console.error);
  };

  return (
    <Card className="w-full mt-5 max-w-2xl mx-auto bg-gray-900 text-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{t('profile')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Label className="font-medium" htmlFor="role">
                Role:
              </Label>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">
                {role}
              </span>
            </div>
          </div>

          <SimpleInput
            id="username"
            name="username"
            onChange={value => {
              setFormData(prev => ({ ...prev, username: value }));
            }}
            placeholder="Username"
            type="text"
            value={formData.username}
          />
          <SimpleInput
            id="firstname"
            name="firstname"
            onChange={value => {
              setFormData(prev => ({ ...prev, firstname: value }));
            }}
            placeholder="Firstname"
            type="text"
            value={formData.firstname}
          />
          <SimpleInput
            id="lastname"
            name="lastname"
            onChange={value => {
              setFormData(prev => ({ ...prev, lastname: value }));
            }}
            placeholder="Lastname"
            type="text"
            value={formData.lastname}
          />
          <SimpleInput
            id="email"
            name="email"
            onChange={value => {
              setFormData(prev => ({ ...prev, email: value }));
            }}
            placeholder="Email"
            type="text"
            value={formData.email}
          />
          <SimpleInput
            id="phone"
            name="phone"
            onChange={value => {
              setFormData(prev => ({ ...prev, phone: value }));
            }}
            placeholder="Phone"
            type="text"
            value={formData.phone}
          />
          <div className="grid grid-cols-2 gap-4">
            <SimpleInput
              id="newPassword"
              name="newPassword"
              onChange={value => {
                setFormData(prev => ({ ...prev, newPassword: value }));
              }}
              placeholder="New Password"
              type="password"
              value={formData.newPassword}
            />
            <SimpleInput
              id="confirmPassword"
              name="confirmPassword"
              onChange={value => {
                setFormData(prev => ({ ...prev, confirmPassword: value }));
              }}
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
            />
          </div>
          <SimpleInput
            id="currentPassword"
            name="currentPassword"
            onChange={value => {
              setFormData(prev => ({ ...prev, currentPassword: value }));
            }}
            placeholder="Current Password"
            type="password"
            value={formData.currentPassword}
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            type="submit"
          >
            {t('update')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
