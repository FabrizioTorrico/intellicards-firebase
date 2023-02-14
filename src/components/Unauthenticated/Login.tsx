import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Signup from '../SignUp'
import { loginWithGoogle, loginWithEmail } from '@database/auth'
import Image from '@lib/Image'

type FormProps = {
  email: string
  password: string
  remember: boolean
}

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('should be a valid email')
      .required('email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormProps>(formOptions)

  const onSubmit = async (data: FormProps) => {
    const error = await loginWithEmail(data.email, data.password)
    if (error) {
      setError('password', { message: 'No matches with info provided' })
    }
  }

  return (
    <>
      <Flex
        as={'section'}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        my={{ base: 0, md: 16 }}
        _before={{
          content: "''",
          background: 'transparent no-repeat center center scroll',
          height: '1000px',
          width: '100%',
          backgroundSize: 'contain',
          backgroundImage: "url('/img/loginBackground.png')",
          position: 'absolute',
          zIndex: '-1',
        }}
        id="login"
      >
        {/* LOGIN */}
        <Stack spacing={8} maxW={'lg'} py={{ base: 0, md: 12 }} px={6}>
          <Stack align={'center'} textAlign={'center'}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
              data-aos="fade-down"
            >
              Ready to{' '}
              <Text as="span" color="main.500">
                Reach
              </Text>{' '}
              your goals?
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'2xl'} p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register('email')}
                    mb={errors.email ? '' : '28px'}
                    name="email"
                    autoComplete="true"
                  />
                  <FormErrorMessage>
                    {errors.email?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    autoComplete="off"
                    {...register('password')}
                    mb={errors.password ? '' : '28px'}
                  />
                  <FormErrorMessage display="block" h="28px">
                    {errors.password?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox colorScheme={'main'} {...register('remember')}>
                      Remember me
                    </Checkbox>
                    <NextLink href="/#">
                      <Link color={'main.600'} href={'/#'}>
                        Forgot password?
                      </Link>
                    </NextLink>
                  </Stack>
                  <Button
                    colorScheme={'main.yellow'}
                    color={'white'}
                    type="submit"
                  >
                    Log in
                  </Button>
                  <hr className="solid" />
                  <Stack direction="row">
                    <Button
                      colorScheme={'main'}
                      color={'white'}
                      type="button"
                      onClick={onOpen}
                    >
                      Create new account
                    </Button>

                    <Button
                      onClick={loginWithGoogle}
                      leftIcon={
                        <Image
                          alt="Google login"
                          src="/img/google-logo.png"
                          height="25px"
                          width="25px"
                        />
                      }
                    >
                      Log in With Google
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <Signup onClose={onClose} />
      </Modal>
    </>
  )
}
